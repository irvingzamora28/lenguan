<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TextToSpeechConvertRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'data' => 'required|array',
            'data.*.text' => 'required|string',
            'data.*.audio_file_name' => 'required|string',
            'lesson_number' => 'required|integer',
            'language_code' => 'nullable|string',
            'country_code' => 'nullable|string',
            'voice_id' => 'nullable|string',
        ];
    }
}
