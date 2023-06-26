<?php

namespace App\Http\Controllers;

use App\Models\Noun;
use App\Services\NounService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    public function genderDuelWords($quantity) : JsonResponse
    {
        $words = $this->nounService->getGenderDuelWords($quantity);
        return response()->json($words);
    }

    public function show(Noun $noun)
    {
        $noun = $this->nounService->getNounById($noun->_id);
        return response()->json($noun);
    }
}
