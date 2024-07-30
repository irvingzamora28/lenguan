<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreGameRoomRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|string',
            'is_guest' => 'required|boolean',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $userId = $this->input('user_id');
            $isGuest = $this->input('is_guest');

            // Validate user ID if not a guest
            if (!$isGuest && !User::find($userId)) {
                $validator->errors()->add('user_id', 'Invalid user ID.');
            }
        });
    }
}
