<?php

namespace App\Contracts;

interface TextToSpeechInterface
{
    /**
     * Converts the given text to speech using the specified voice key search.
     *
     * @param string $text The text to convert to speech.
     * @param string $voiceKeySearch The voice key search to use for selecting the voice.
     * @param string|null $voiceId The ID of the voice to use (optional).
     * @return string The converted speech.
     */
    public function convertTextToSpeech($text, $voiceKeySearch, $voiceId = null);

    /**
     * Downloads the audio file from the specified URL to the given destination.
     *
     * @param string $url The URL of the audio file.
     * @param string $destination The destination path to save the audio file.
     * @return void
     */
    public function downloadAudioFile($url, $destination);

    /**
     * Retrieves the audio URL for the given text and voice.
     *
     * @param string $text The text to convert.
     * @param string $voice The voice to use.
     * @return string The audio URL.
     */
    public function getAudioUrl($text, $voice);

    /**
     * Retrieves the available voices.
     *
     * @return array The available voices.
     */
    public function retrieveVoices();

    /**
     * Saves the voices as JSON.
     *
     * @param array $voices The voices to save.
     * @return void
     */
    public function saveVoicesAsJson($voices);
}
