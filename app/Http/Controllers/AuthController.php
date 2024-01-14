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
            'guest_data' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        $username = strstr($validated["email"], '@', true); // extract username from email
        $base_username = $username; // store the base username for reference
        $counter = 1; // initialize counter for adding digits to the username
        while (User::where('username', $username)->exists()) { // check if username already exists
            $username = $base_username . $counter; // add a digit to the username
            $counter++;
        }

        $guestData = $validated["guest_data"] ? json_decode($validated["guest_data"]) : null;
        $course = $guestData ? $guestData->course : null;
        $learningLanguage = $guestData ? $guestData->learning_language : null;
        $user = User::create([
            'name' => $validated["name"],
            'email' => $validated["email"],
            'username' => $username, // store the unique username
            'password' => Hash::make($validated["password"]),
            'native_language_code' => $course->native_language_code ?? "en", // Default to english for now
            'course_id' => $course->_id ?? null,
            'language_id' => $learningLanguage->_id ?? null,
        ]);


        return response()->json(['message' => 'Welcome! Please check your email to verify your account. Meantime you can have access, enjoy!'], 201);
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
