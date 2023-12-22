<?php

namespace App\Http\Controllers;

use App\Contracts\TextToSpeechInterface;
use App\Http\Requests\TextToSpeechConvertRequest;
use App\Services\LanguageCodeService;
use Illuminate\Http\Request;

class TextToSpeechController extends Controller
{
    protected $textToSpeechService;

    protected $languageCodeService;

    public function __construct(TextToSpeechInterface $textToSpeechService, LanguageCodeService $languageCodeService)
    {
        $this->textToSpeechService = $textToSpeechService;
        $this->languageCodeService = $languageCodeService;
    }

    /**
     * Convert text to speech.
     *
     * @param TextToSpeechConvertRequest $request The request object containing the voice ID, data, language code, and country code.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the status of the audio file creation.
     */
    public function convertTextToSpeech(TextToSpeechConvertRequest $request)
    {

        $voiceId = $request->validated('voice_id');
        $data = $request->validated('data');
        $languageCode = $request->validated('language_code');
        $countryCode = $request->validated('country_code');
        $lessonNumber = $request->validated('lesson_number');

        foreach ($data as $item) {
            $text = $item['text'];
            $audioFilename = $item['audio_file_name'];
            if (!$this->languageCodeService->isValidCountryCode($countryCode) || !$this->languageCodeService->isValidLanguageCode($languageCode)) {
                return response()->json([
                    'message' => 'Invalid country code or language code',
                ], 400);
            }

            $languageName = strtolower($this->languageCodeService->getLanguageName($languageCode));
            $languageCodeCountryCode = $this->languageCodeService->getLanguageCodeCountryCode($languageCode, $countryCode);
            try {
                $audioUrl = $this->textToSpeechService->convertTextToSpeech($text, $languageCodeCountryCode, $voiceId);
                $destination = $this->getAudioFileDestination($languageName, $lessonNumber, $audioFilename);
                $this->textToSpeechService->downloadAudioFile($audioUrl, $destination);
            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Error converting text to speech',
                    'error' => $th->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'message' => 'Audio files created successfully',
        ], 201);
    }

    /**
     * Retrieve the available voices for text-to-speech conversion.
     *
     * @param Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the retrieved voices.
     */
    public function retrieveVoices(Request $request)
    {
        $response = $this->textToSpeechService->retrieveVoices();
        return response()->json([
            'message' => 'Voices retrieved successfully',
            'data' => $response
        ], 200);
    }

    /**
     * Get the destination path for the audio file.
     *
     * @param string $languageName The name of the language.
     * @param int $lessonNumber The lesson number.
     * @param string $audioFilename The name of the audio file.
     * @return string The destination path for the audio file.
     */
    private function getAudioFileDestination(string $languageName, int $lessonNumber, string $audioFilename): string
    {
        return public_path() . '/../frontend/src/assets/courses/' . $languageName . '/_shared/lessons/lesson' . $lessonNumber . '/audio/' . $audioFilename;
    }
}
