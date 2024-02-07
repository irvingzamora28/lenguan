<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactFormMail;
use App\Mail\FeedbackFormMail;
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

    function feedbackForm(Request $request): JsonResponse
    {
        $this->validate($request, [
            'usability' => 'nullable|string',
            'feature_request' => 'nullable|string',
            'learning_materials' => 'nullable|string',
            'new_languages' => 'nullable|string',
            'course_pace' => 'nullable|string',
            'general_feedback' => 'required|string',
        ]);

        try {
            $data = $request->all();
            $formSubmission = FormSubmission::create(['data' => $data]);
            Mail::to('contact@lenguan.de')->send(new FeedbackFormMail($data));
            return response()->json(['message' => 'Feedback submitted successfully', 'success' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error submitting feedback: ' . $e->getMessage(), 'success' => false], 500);
        }
    }
}
