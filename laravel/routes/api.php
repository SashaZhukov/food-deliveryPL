<?php

use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
});

Route::prefix('/admin')->group(function () {
    Route::post('users/{id}/update', [UserController::class, 'updateUser']);
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::post('/users/create', [UserController::class, 'addUser']);
    Route::get('/users/{id}', [UserController::class, 'getUserForView']);
    Route::post('/forgot-password', [UserController::class, 'sendResetLinkEmail']);
    Route::get('/users/{id}/delete', [UserController::class, 'deleteUser']);
})->middleware([RoleMiddleware::class, 'auth:sanctum']);

Route::get('/check-user-for-reset', [UserController::class, 'checkUserForReset']);
Route::post('save-password', [UserController::class, 'savePassword']);
