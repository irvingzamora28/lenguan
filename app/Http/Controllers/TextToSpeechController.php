<?php

namespace App\Http\Controllers;

use App\Contracts\TextToSpeechInterface;
use App\Contracts\UserServiceInterface;
use App\Enums\Language;
use App\Models\User;
use App\Utilities\LanguageCodes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
        // Sample data request
        // [
        //     {
        //         "text": "Wo ist...? . Wie komme ich zu...? . Biegen Sie links/rechts ab. . Gehen Sie geradeaus.",
        //         "language_code": "de",
        //         "lesson_number": 8,
        //         "audio_file_name": "asking-directions.mp3"
        //     },
        //     {
        //         "text": "Ich reise nach... . Ich nehme den Zug/Bus/Flug. . Ich habe eine Fahrkarte für...",
        //         "language_code": "de",
        //         "lesson_number": 8,
        //         "audio_file_name": "travel-plans.mp3"
        //     },
        //      {
        //         "text": "Entschuldigung, wo ist der Bahnhof? .  Gehen Sie geradeaus und dann biegen Sie links ab. Der Bahnhof ist neben dem Postamt. . Kann ich bitte eine Fahrkarte nach Berlin haben? . Natürlich, ein Hin-und Rückfahrticket, oder, nur Hinfahrt?",
        //         "language_code": "de",
        //         "lesson_number": 8,
        //         "audio_file_name": "practice-dialogues.mp3"
        //     }
        // ]

        $validator = Validator::make($request->all(), [
            'data' => 'required|array',
            'data.*.text' => 'required|string',
            'data.*.language_code' => 'required|string',
            'data.*.lesson_number' => 'required|integer',
            'data.*.audio_file_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 400);
        }

        $data = $request->input('data');

        foreach ($data as $item) {
            $text = $item['text'];
            $languageCode = $item['language_code'];
            $lessonNumber = $item['lesson_number'];
            $audioFilename = $item['audio_file_name'];
            $voice = $this->getVoice($languageCode, 'intermediate');
            $audioUrl = $this->textToSpeechService->convertTextToSpeech($text, $voice);
            $languageName = strtolower($this->getLanguageName($languageCode));
            $destination = public_path() . '/../frontend/src/assets/courses/' . $languageName . '/_shared/lessons/lesson' . $lessonNumber . '/audio/' . $audioFilename;

            $this->textToSpeechService->downloadAudioFile($audioUrl, $destination);
        }

        return response()->json([
            'message' => 'Audio files created successfully',
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
                $voice = '64e2f74636fe21ca612f15ca';
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
        return LanguageCodes::getName($languageCode);
    }
}
