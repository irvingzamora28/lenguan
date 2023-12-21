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

    protected $apiBaseUrl = 'https://api.genny.lovo.ai';

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.gennylovo.api_key');
    }

    public function convertTextToSpeech($text, $voice)
    {
        $response = $this->client->request('POST', $this->apiBaseUrl . '/api/v1/tts/sync', [
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
        $response = $this->client->request('GET', $this->apiBaseUrl . '/api/v1/speakers', [
            'headers' => [
                'X-API-KEY' => $this->apiKey,
                'accept' => 'application/json',
            ],
        ]);

        return json_decode($response->getBody(), true);
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
