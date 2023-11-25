<?php

namespace App\Services;

use App\Contracts\UserServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserService implements UserServiceInterface
{
    public function updateUser(User $user, array $data): User
    {
        // Check if a new profile picture is provided
        if (isset($data['image'])) {
            // Delete the old image if it exists
            if ($user->profile_image_path && Storage::disk('public')->exists($user->profile_image_path)) {
                Storage::disk('public')->delete($user->profile_image_path);
            }

            // Upload new image and update the path
            $filePath = $this->uploadProfilePicture($data['image']);
            $data['profile_image_path'] = $filePath;

            // Remove the actual image from the data array
            unset($data['image']);
        }

        $user->update($data);
        return $user;
    }

    protected function uploadProfilePicture($image)
    {
        $originalName = $image->getClientOriginalName();
        $extension = $image->getClientOriginalExtension();
        $nameWithoutExtension = pathinfo($originalName, PATHINFO_FILENAME);

        // Truncate the file name to keep the overall length to 64 chars (including time prefix and extension)
        $maxLength = 64 - strlen(time() . '_') - strlen($extension) - 1; // -1 for the dot before extension
        $truncatedName = substr($nameWithoutExtension, 0, $maxLength);

        $fileName = time() . '_' . $truncatedName . '.' . $extension;
        $filePath = 'images/profile/' . $fileName;

        Storage::disk('public')->put($filePath, file_get_contents($image));

        return $filePath;
    }

    public function updateUserLanguage(User $user, array $data): User
    {
        $user->language_id = $data['language_id'];
        $user->save();
        return $user;
    }
}
