<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Contracts\UserServiceInterface;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function update(UpdateUserRequest $request)
    {
        $user = $this->userService->updateUser($request->user(), $request->validated());
        return response()->json([
            'user' => new UserResource($user),
            'message' => 'User updated successfully.'
        ]);
    }
}
