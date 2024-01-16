<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactFormMail;
use App\Models\FormSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FormSubmitController extends Controller
{

    function contactForm(ContactFormRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $formSubmission = FormSubmission::create(['data' => $data]);
            Mail::to('contact@lenguan.de')->send(new ContactFormMail($data));
            return response()->json(['message' => 'Form submitted successfully', 'success' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error submitting form: ' . $e->getMessage(), 'success' => false], 500);
        }
    }
}
