<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PlayerController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:players',
            'email' => 'required|email|unique:players',
            'password' => 'required|min:6',
        ]);

        $player = new Player([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $player->save();

        return response()->json(['message' => 'Player registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $player = Player::where('email', $request->email)->first();

        if (!$player || !Hash::check($request->password, $player->password)) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        $token = $player->createToken('api_token')->plainTextToken;

        return response()->json(['api_token' => $token]);
    }


    public function index()
    {
        $players = Player::all();
        return response()->json($players);
    }

    public function show(Player $player)
    {
        return response()->json($player);
    }
}
