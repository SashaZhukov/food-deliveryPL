<?php

namespace App\Http\Services\admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function create(Request $request)
    {
        $user = $request->validated();
        $UserRole = Role::where('name', 'user')->first();

        User::create([
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
            'password' => Hash::make($user['password']),
            'role_id' => $UserRole->id,
        ]);
    }
}
