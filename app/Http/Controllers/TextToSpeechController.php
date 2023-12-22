<?php

namespace App\Http\Controllers;

use App\Contracts\TextToSpeechInterface;
use App\Contracts\UserServiceInterface;
use App\Utilities\LanguageCodes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TextToSpeechController extends Controller
{
    protected $textToSpeechService;
    protected $userService;

    public function __construct(TextToSpeechInterface $textToSpeechService, UserServiceInterface $userService)
    {
        $this->textToSpeechService = $textToSpeechService;
        $this->userService = $userService;
    }

    public function convertTextToSpeech(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'data' => 'required|array',
            'data.*.text' => 'required|string',
            'data.*.lesson_number' => 'required|integer',
            'data.*.audio_file_name' => 'required|string',
            'language_code' => 'nullable|string',
            'country_code' => 'nullable|string',
            'voice_id' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 400);
        }

        $voiceId = $request->input('voice_id');
        $data = $request->input('data');
        $languageCode = $request->input('language_code');
        $countryCode = $request->input('country_code');

        foreach ($data as $item) {
            $text = $item['text'];
            $lessonNumber = $item['lesson_number'];
            $audioFilename = $item['audio_file_name'];
            if (!LanguageCodes::countryCodeIsValid($countryCode) || !LanguageCodes::languageCodeIsValid($languageCode)) {
                return response()->json([
                    'message' => 'Invalid country code or language code',
                ], 400);
            }

            $languageName = strtolower($this->getLanguageName($languageCode));
            $languageCodeCountryCode = LanguageCodes::getLanguageCodeCountryCode($languageCode, $countryCode);
            try {
                $audioUrl = $this->textToSpeechService->convertTextToSpeech($text, $languageCodeCountryCode, $voiceId);
                $destination = public_path() . '/../frontend/src/assets/courses/' . $languageName . '/_shared/lessons/lesson' . $lessonNumber . '/audio/' . $audioFilename;
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

    public function retrieveVoices(Request $request)
    {
        $response = $this->textToSpeechService->retrieveVoices();
        return response()->json([
            'message' => 'Voices retrieved successfully',
            'data' => $response
        ], 200);
    }

    private function getLanguageName(string $languageCode): ?string
    {
        return LanguageCodes::getName($languageCode);
    }
}
