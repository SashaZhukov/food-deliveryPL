<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
});

Route::prefix('/admin')->group(function () {
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::post('/users/create', [UserController::class, 'addUser']);
})->middleware([RoleMiddleware::class, 'auth:sanctum']);

