<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Models\FormSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FormSubmitController extends Controller
{

    function contactForm(ContactFormRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $formSubmission = FormSubmission::create(['data' => $data]);
            return response()->json(['message' => 'Form submitted successfully', 'success' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error submitting form: ' . $e->getMessage(), 'success' => false], 500);
        }
    }
}
