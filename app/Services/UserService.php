<?php

namespace App\Services;

use App\Contracts\UserServiceInterface;
use App\Models\User;

class UserService implements UserServiceInterface
{
    public function updateUser(User $user, array $data): User
    {
        $user->update($data);
        return $user;
    }
}
