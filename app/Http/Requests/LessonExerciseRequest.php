<?php

namespace App\Http\Requests;

use App\Models\Lesson;
use Illuminate\Foundation\Http\FormRequest;

class LessonExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'course_id' => 'required|exists:courses,_id',
        ];
    }

    // This method gets called after the validation rules pass
    protected function passedValidation()
    {
        $lesson = Lesson::where(['course_id' => $this->course_id, 'lesson_number' => (int)$this->lesson_number])->first();

        if (!$lesson) {
            $this->customFailedValidation('lesson_number', 'The selected lesson number is invalid for the specified course.');
        }

        // Store the lesson in the request object for easy access in the controller
        $this->request->add(['lesson' => $lesson]);
    }

    private function customFailedValidation($field, $message)
    {
        abort(response()->json(['errors' => [$field => $message]], 422));
    }
}
