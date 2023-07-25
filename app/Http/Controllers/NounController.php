<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenderDuelWordsRequest;
use App\Models\Noun;
use App\Services\NounService;
use Illuminate\Http\JsonResponse;

class NounController extends Controller
{

    private $nounService;

    public function __construct(NounService $nounService)
    {
        $this->nounService = $nounService;
    }

    public function index()
    {
        $nouns = $this->nounService->getAllNouns();
        return response()->json($nouns);
    }

    public function genderDuelWords(GenderDuelWordsRequest $request): JsonResponse
    {
        $languageId = $request->query('language_id');
        $quantity = $request->query('quantity', 20);
        $difficultyLevel = $request->query('difficulty_level', 1);

        $words = $this->nounService->getGenderDuelWords($quantity, $languageId, $difficultyLevel);

        return response()->json($words);
    }



    public function show(Noun $noun)
    {
        $noun = $this->nounService->getNounById($noun->_id);
        return response()->json($noun);
    }
}