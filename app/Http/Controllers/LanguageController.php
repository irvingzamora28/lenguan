<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index()
    {
        $languages = Language::all();
        return response()->json($languages);
    }

    public function show(Language $language)
    {
        return response()->json($language);
    }

    public function courses(Language $language)
    {
        $courses = $language->courses;
        return response()->json($courses);
    }
}
