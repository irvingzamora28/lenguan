<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
            'password' => Hash::make($request->password),
        ]);

        // $user->sendEmailVerificationNotification();

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

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // if (!$user->hasVerifiedEmail()) {
        //     return response()->json(['message' => 'Email not verified'], 403);
        // }

        $token = $user->createToken($request->email)->plainTextToken;

        return response()->json(['token' => $token]);
    }
}
