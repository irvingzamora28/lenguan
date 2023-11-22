<?php

namespace App\Contracts;

use App\Models\User;

interface UserServiceInterface
{
    public function updateUser(User $user, array $data): User;
}
