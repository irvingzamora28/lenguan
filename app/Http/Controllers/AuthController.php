<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $username = strstr($request->email, '@', true); // extract username from email
        $base_username = $username; // store the base username for reference
        $counter = 1; // initialize counter for adding digits to the username
        while (User::where('username', $username)->exists()) { // check if username already exists
            $username = $base_username . $counter; // add a digit to the username
            $counter++;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $username, // store the unique username
            'native_language_code' => "en", // Default to english for now
            'password' => Hash::make($request->password),
        ]);


        return response()->json(['message' => 'User registered successfully. Please check your email to verify your account.']);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)
            ->with(['language' => function ($query) {
                $query->select('_id', 'name', 'code');
            }, 'course' => function ($query) {
                $query->select('_id', 'name', 'description', 'image', 'language_id', 'levels');
            }])
            ->first(['name', 'username', 'email', 'password', 'language_id', 'course_id', 'native_language_code', 'profile_image_path']);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken($request->email)->plainTextToken;
        $request->session()->regenerate();

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }
}
