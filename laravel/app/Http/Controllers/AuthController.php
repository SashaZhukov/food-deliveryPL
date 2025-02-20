<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $user = User::where('email', $credentials['email'], )->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Nieprawidłowy login lub hasło'], 401);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        return response()->json(['message' => 'Udało Ci się autoryzować'])
            ->cookie('auth-token', $token, 60 * 24, '/', null, true, false);
    }
}
