<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): JsonResponse
    {
//        if (!Auth::check()) {
//            return response()->json(['message' => 'Forbidden'], 403);
//        }
//
//        $user = Auth::user();
//
//        if ($user->role !== $role) {
//            return response()->json(['message' => 'Forbidden'], 403);
//        }

        return $next($request);
    }
}
