<?php

namespace App\Contracts;

interface TextToSpeechInterface
{
    public function convertTextToSpeech($text, $voiceKeySearch, $voiceId);
    public function downloadAudioFile($url, $destination);
    public function getAudioUrl($text, $voice);
    public function retrieveVoices();

    public function saveVoicesAsJson($voices);
}
