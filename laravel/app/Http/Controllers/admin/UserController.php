<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\CreateUserRequest;
use App\Http\Requests\admin\UpdateUserRequest;
use App\Http\Services\admin\UserService;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

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
            return User::with('role')->orderBy('id', 'asc')->get();
        });

        return response()->json($users);
    }

    public function addUser(CreateUserRequest $request): JsonResponse
    {
        $this->userService->create($request);

        return response()->json(['message' => 'User successfully created']);
    }

    public function getUserForView(int $id): JsonResponse
    {
        $user = User::with('role')->find($id);
        $roles = Role::all();
        return response()->json(['user' => $user, 'role' => $roles]);
    }

    public function updateUser(UpdateUserRequest $request, int $id): JsonResponse
    {
         $success = $this->userService->update($request, $id);

         if (!$success) {
             return response()->json(['message' => 'User editing error!']);
         }

        return response()->json(['message' => 'User successfully updated']);
    }

    public function sendResetLinkEmail(Request $request): JsonResponse
    {
        $email = $request->input('email');

        $activeToken = DB::table('password_resets')->where('email', $email)->first();

        if ($activeToken) {
            return response()->json(['message' => 'The password reset token has already been created'], 400);
        }

        $successSend = $this->userService->sendResetMail($request, $email);

        if (array_key_exists('error', $successSend)) {
            return response()->json(['message' => $successSend['error']], 400);
        }

        return response()->json(['message' => $successSend['success']], 200);
    }

    public function checkUserForReset(Request $request): JsonResponse
    {
        $email = $request->query('email');
        $token = $request->query('token');

        $accessToken = DB::table('password_resets')->where('email', $email)->where('token', $token)->first();

        if (!$accessToken) {
            return response()->json(['message' => "Your token isn't active now"], 400);
        }

        return response()->json(['message' => "success"], 200);
    }

    public function savePassword(Request $request): JsonResponse
    {
        $result = $this->userService->checkTokenAndResetPass($request);

        if (array_key_exists('error', $result)) {
            return response()->json(['message' => $result['error']], 400);
        }

        return response()->json(['message' => $result['success']], 200);
    }
}
