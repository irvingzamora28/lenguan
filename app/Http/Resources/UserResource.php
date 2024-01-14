<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->_id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'profile_image_path' => $this->profile_image_path,
            'native_language_code' => $this->native_language_code,
            'learning_language' => $this->language,
            'course' => $this->course,
        ];
    }
}
