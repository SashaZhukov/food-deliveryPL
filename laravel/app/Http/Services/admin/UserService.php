<?php

namespace App\Http\Services\admin;

use App\Mail\PasswordResetFromAdmin;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserService
{
    public function create(Request $request): void
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

    public function update(Request $request, int $userId): bool
    {
        $validated = $request->validated();

        $dbName = key($validated);
        $user = User::find($userId);

        if (!$user) {
            return false;
        }

        if ($dbName === 'role') {
            $roleId = Role::where('name', $validated['role'])->first()->id;
            $user->update(['role_id' => $roleId]);
        }

        $user->update([
            $dbName => $validated[$dbName]
        ]);

        return true;
    }

    public function sendResetMail(Request $request, string $email): array
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
           return ["error" => 'User not found'];
        }

        $token = Str::random(64);

        DB::table('password_resets')->where('email', $email)->delete();
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        $frontendUrl = config('app.frontend_url');
        $resetLink = $frontendUrl . '/reset-password/?token=' . urlencode($token) . '&email=' . urlencode($email);

        Mail::to($email)->send(new PasswordResetFromAdmin($resetLink));

        return ["success" => "Email has been sent to " . $email];
    }

    public function checkTokenAndResetPass(Request $request): array
    {
        $token = $request->input('token');
        $email = $request->input('email');

        $resetApplication = DB::table('password_resets')->where('email', $email)->where('token', $token)->first();

        if (!$resetApplication) {
            return ['error' => "Your password reset token is invalid"];
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            return ['error' => "User is not found"];
        }

        $request->validate([
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6',
        ]);

        if (!Hash::check($request->input('password'), $user->password)) {
            return ['error' => "Password must not look like the old password"];
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();

        DB::table('password_resets')->where('email', $email)->where('token', $token)->delete();
        $user->tokens()->delete();

        return ['success' => "Your password has been successfully changed."];
    }
}
