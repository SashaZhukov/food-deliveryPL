<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(): JsonResponse
    {
        return response()->json(auth()->user());
    }
}
