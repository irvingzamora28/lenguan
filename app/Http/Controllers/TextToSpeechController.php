<?php

namespace App\Http\Controllers;

use App\Contracts\TextToSpeechInterface;
use App\Contracts\UserServiceInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        // Test data request
        // {
        //     "text": "Guten Tag, dies ist ein Test für die Text-zu-Sprache-Umwandlung.",
        //     "language_code": "de",
        //     "lesson_number": 1
        //   }

        $text = $request->input('text');
        $languageCode = $request->input('language_code');
        $lessonNumber = $request->input('lesson_number');
        $voice = $this->getVoice($languageCode, 'intermediate');
        $response = $this->textToSpeechService->convertTextToSpeech($text, $voice);
        $audioUrl = $response['audio_url'];
        $destination = 'frontend/src/assets/courses/' . strtolower($this->getLanguageName($languageCode)) . '/_shared/lessons/lesson' . $lessonNumber . '/audio/' . $response['audio_filename'];
        $this->textToSpeechService->downloadAudioFile($audioUrl, $destination);
        return response()->json([
            'message' => 'Audio file created successfully',
            'data' => $response
        ], 201);
    }

    private function getVoice($language, $course): string
    {
        $voice = '';
        if ($language == 'en') {
            if ($course == 'beginner') {
                $voice = 'Joanna';
            } else if ($course == 'intermediate') {
                $voice = 'Matthew';
            } else if ($course == 'advanced') {
                $voice = 'Joanna';
            }
        } else if ($language == 'fr') {
            if ($course == 'beginner') {
                $voice = 'Celine';
            } else if ($course == 'intermediate') {
                $voice = 'Mathieu';
            } else if ($course == 'advanced') {
                $voice = 'Celine';
            }
        } else if ($language == 'de') {
            if ($course == 'beginner') {
                $voice = 'VickiNeural';
            } else if ($course == 'intermediate') {
                $voice = 'VickiNeural';
            } else if ($course == 'advanced') {
                $voice = 'Hans';
            }
        } else if ($language == 'es') {
            if ($course == 'beginner
            ') {
                $voice = 'Conchita';
            } else if ($course == 'intermediate') {
                $voice = 'Enrique';
            } else if ($course == 'advanced') {
                $voice = 'Conchita';
            }
        } else if ($language == 'it') {
            if ($course == 'beginner') {
                $voice = 'Giorgio';
            } else if ($course == 'intermediate') {
                $voice = 'Carla';
            } else if ($course == 'advanced') {
                $voice = 'Giorgio';
            }
        } else if ($language == 'pt') {
            if ($course == 'beginner') {
                $voice = 'Cristiano';
            } else if ($course == 'intermediate') {
                $voice = 'Ines';
            } else if ($course == 'advanced') {
                $voice = 'Cristiano';
            }
        } else if ($language == 'ru') {
            if ($course == 'beginner') {
                $voice = 'Maxim';
            } else if ($course == 'intermediate') {
                $voice = 'Tatyana';
            } else if ($course == 'advanced') {
                $voice = 'Maxim';
            }
        } else if ($language == 'zh') {
            if ($course == 'beginner') {
                $voice = 'Zhiyu';
            } else if ($course == 'intermediate') {
                $voice = 'Zhiyu';
            } else if ($course == 'advanced') {
                $voice = 'Zhiyu';
            }
        }
        return $voice;
    }

    public function retrieveVoices(Request $request)
    {
        $response = $this->textToSpeechService->retrieveVoices();
        return response()->json([
            'message' => 'Voices retrieved successfully',
            'data' => $response
        ], 200);
    }

    private function getAudioFile($filename)
    {
        $file = Storage::disk('local')->get($filename);
        return response($file, 200)->header('Content-Type', 'audio/mpeg');
    }

    private function getLanguageName(string $languageCode): ?string
    {
        $languageCode = strtoupper($languageCode);
        $languageEnum = Language::tryFrom($languageCode);
        return $languageEnum?->name();
    }
}
