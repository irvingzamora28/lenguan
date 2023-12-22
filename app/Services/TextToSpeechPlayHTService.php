<?php

namespace App\Services;

use App\Contracts\TextToSpeechInterface;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class TextToSpeechPlayHTService implements TextToSpeechInterface
{
    protected $client;
    protected $apiKey;
    protected $userId;

    const SERVICE = 'gennylovo';
    const API_BASE_URL = 'https://play.ht/api/v2';
    const VOICES_FILE_PATH = '/voices/' . SELF::SERVICE . '_voices.json';
    const VOICE_KEYSEARCH_FIELD = 'locale';
    const VOICE_ID = 'id';


    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.playht.api_key');
        $this->userId = config('services.playht.user_id');
    }

    public function convertTextToSpeech($text, $voiceKeySearch, $voiceId)
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

    public function getAudioUrl($text, $voice, $voiceEngine = 'PlayHT2.0')
    {
        $response = $this->client->request('POST', SELF::API_BASE_URL . '//tts', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'X-USER-ID' => $this->userId,
                'Accept' => 'text/event-stream',
                'Content-Type' => 'application/json'
            ],
            'json' => [
                'text' => $text,
                'voice' => $voice,
                'voice_engine' => $voiceEngine
            ]
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
        $response = $this->client->request('GET', SELF::API_BASE_URL . '/voices', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'X-USER-ID' => $this->userId,
                'Accept' => 'application/json',
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
        $stream = $responseBody;
        while (!$stream->eof()) {
            $line = rtrim($stream->readLine());

            if (str_starts_with($line, 'event: completed')) {
                $dataLine = rtrim($stream->readLine());
                $data = json_decode(substr($dataLine, 6), true); // Extract JSON after 'data: '
                return $data['url'] ?? null;
            }
        }

        return null;
    }
}
