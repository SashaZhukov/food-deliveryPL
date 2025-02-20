<?php

namespace Database\Seeders;

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
        User::create([
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'email' => 'sasha01zhukov@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
