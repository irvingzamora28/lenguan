<?php

namespace App\Contracts;

use App\Models\User;

interface UserServiceInterface
{
    public function updateUser(User $user, array $data): User;

    public function updateUserLanguage(User $user, array $data): User;
    public function updateUserCourse(User $user, array $data): User;
}
