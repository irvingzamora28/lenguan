<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Contracts\UserServiceInterface;
use App\Http\Requests\UpdateUserTargetCourseRequest;
use App\Http\Requests\UpdateUserTargetLanguageRequest;
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

    public function updateTargetLanguage(UpdateUserTargetLanguageRequest $request)
    {
        $user = $this->userService->updateUserLanguage($request->user(), $request->validated());

        return response()->json([
            'user' => new UserResource($user),
            'message' => 'User language updated successfully.'
        ]);
    }

    public function updateTargetCourse(UpdateUserTargetCourseRequest $request)
    {
        $user = $this->userService->updateUserCourse($request->user(), $request->validated());

        return response()->json([
            'user' => new UserResource($user),
            'message' => 'User Course updated successfully.'
        ]);
    }
}
