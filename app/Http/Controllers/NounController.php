<?php

namespace App\Http\Controllers;

use App\Models\Noun;
use Illuminate\Http\Request;

class NounController extends Controller
{
    public function index()
    {
        $nouns = Noun::all();
        return response()->json($nouns);
    }

    public function show(Noun $noun)
    {
        return response()->json($noun);
    }
}
