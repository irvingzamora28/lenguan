<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
    public function rules()
    {
        $userId = $this->user()->getKey();
        return [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $userId . ',_id',
            'email' => 'required|string|email|max:255|unique:users,email,' . $userId . ',_id',
            'image' => 'sometimes|file|image|max:5000', // Accepting image files up to 5MB
        ];
    }
}
