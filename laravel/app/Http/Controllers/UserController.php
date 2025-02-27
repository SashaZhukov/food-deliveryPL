<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    public function getUser(): JsonResponse
    {
        $user = auth()->user()->load('role');

        return response()->json($user);
    }

    public function getUsers(): JsonResponse
    {
        $users = Cache::remember('users', 3600, function () {
            return User::with('role')->get();
        });

        return response()->json($users);
    }
}
