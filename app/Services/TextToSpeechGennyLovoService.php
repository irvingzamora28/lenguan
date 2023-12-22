<?php

namespace App\Services;

use App\Contracts\TextToSpeechInterface;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class TextToSpeechGennyLovoService implements TextToSpeechInterface
{
    protected $client;
    protected $apiKey;

    const SERVICE = 'gennylovo';
    const API_BASE_URL = 'https://api.genny.lovo.ai';
    const VOICES_FILE_PATH = '/voices/' . SELF::SERVICE . '_voices.json';
    const VOICE_KEYSEARCH_FIELD = 'locale';
    const VOICE_ID = 'id';

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.gennylovo.api_key');
    }

    public function convertTextToSpeech($text, $voiceKeySearch, $voiceId = null)
    {
        try {
            if (!$voiceId) {
                $voiceId = $this->selectVoice($voiceKeySearch);
            }
            $audioUrl = $this->getAudioUrl($text, $voiceId);
            return $audioUrl;
        } catch (\Throwable $th) {
            throw new Exception("Error converting text to speech: " . $th->getMessage());
        }
    }

    public function getAudioUrl($text, $voice)
    {
        $response = $this->client->request('POST', SELF::API_BASE_URL . '/api/v1/tts/sync', [
            'body' => json_encode([
                'text' => $text,
                'speaker' => $voice,
                'speed' => 1,
            ]),
            'headers' => [
                'X-API-KEY' => $this->apiKey,
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ],
        ]);
        $responseBody = json_decode($response->getBody(), true);
        return $this->extractAudioUrlFromResponse($responseBody);
    }

    public function selectVoice($voiceId): string
    {
        $voicesData = $this->getVoicesFromJson();
        $voices = $voicesData['data'] ?? [];
        $voice = collect($voices)->firstWhere(SELF::VOICE_KEYSEARCH_FIELD, $voiceId);
        if (!$voice) {
            throw new Exception("Voice not found.");
        }
        return $voice[SELF::VOICE_ID];
    }

    public function downloadAudioFile($url, $destination)
    {
        $audioContent = file_get_contents($url);
        if (!is_dir(dirname($destination))) {
            mkdir(dirname($destination), 0755, true);
        }
        file_put_contents($destination, $audioContent);
    }


    public function retrieveVoices()
    {
        $response = $this->client->request('GET', SELF::API_BASE_URL . '/api/v1/speakers', [
            'headers' => [
                'X-API-KEY' => $this->apiKey,
                'accept' => 'application/json',
            ],
        ]);
        $this->saveVoicesAsJson($response->getBody());
        return json_decode($response->getBody(), true);
    }

    public function saveVoicesAsJson($voices)
    {
        $voicesArray = json_decode($voices, true);
        Storage::disk('local')->put(self::VOICES_FILE_PATH, json_encode($voicesArray, JSON_PRETTY_PRINT));
    }

    public function getVoicesFromJson()
    {
        $voices = Storage::disk('local')->get(self::VOICES_FILE_PATH);
        return json_decode($voices, true);
    }

    private function extractAudioUrlFromResponse($responseBody)
    {
        // Check if the keys exist to avoid undefined index errors
        if (isset($responseBody['data'][0]['urls'][0])) {
            return $responseBody['data'][0]['urls'][0];
        }

        throw new Exception("Audio URL not found in the response.");
    }
}
