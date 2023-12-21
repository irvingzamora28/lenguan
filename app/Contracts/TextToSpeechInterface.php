<?php

namespace App\Contracts;

interface TextToSpeechInterface
{
    public function convertTextToSpeech($text, $voice);
    public function downloadAudioFile($url, $destination);

    public function retrieveVoices();
}
