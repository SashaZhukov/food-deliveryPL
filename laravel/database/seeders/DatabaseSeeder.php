<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'admin',
        ]);

        Role::create([
            'name' => 'user',
        ]);

        User::create([
            'first_name' => 'Sasha',
            'last_name' => 'Zhukov',
            'role_id' => 1,
            'email' => 'sasha01zhukov@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
