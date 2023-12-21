<?php

namespace App\Services;

use App\Contracts\TextToSpeechInterface;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class TextToSpeechPlayHTService implements TextToSpeechInterface
{

    protected $client;
    protected $apiKey;

    protected $userId;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('services.playht.api_key');
        $this->userId = config('services.playht.user_id');
    }


    public function convertTextToSpeech($text, $voice, $voiceEngine = 'PlayHT2.0')
    {
        $response = $this->client->post('https://play.ht/api/v2/tts', [
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

        return $this->parseEventStreamResponse($response);
    }

    protected function parseEventStreamResponse($response)
    {
        $stream = $response->getBody();
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

    public function retrieveVoices()
    {
        $response = $this->client->request('GET', 'https://api.play.ht/api/v2/voices', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'X-USER-ID' => $this->userId,
                'Accept' => 'application/json',
            ],
        ]);
        echo $response->getBody();
        // $this->saveVoicesAsJson($response->getBody());
    }

    protected function saveVoicesAsJson($voices)
    {
        $voicesArray = json_decode($voices, true);
        Storage::disk('local')->put('voices.json', json_encode($voicesArray, JSON_PRETTY_PRINT));
    }

    public function downloadAudioFile($url, $destination)
    {
        $audioContent = file_get_contents($url);
        Storage::disk('local')->put($destination, $audioContent);
    }
}
