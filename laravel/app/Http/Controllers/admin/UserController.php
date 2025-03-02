<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\CreateUserRequest;
use App\Http\Services\admin\UserService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

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

    public function addUser(CreateUserRequest $request): JsonResponse
    {
        $this->userService->create($request);

        return response()->json(['message' => 'User successfully created']);
    }
}
