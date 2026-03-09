<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $response = $this->authService->login($request->validated());

        if (!empty($response['errors'])) {
            return response()->json([
                'success' => false,
                'errors' => $response['errors'],
            ], 422);
        }

        if($response['status'] == 'invalid_credentials') {
            return response()->json($response, 401);
        }

        if($response['success']) {
            return response()->json($response, 200);
        }

        return response()->json($response, 500);

    }

    public function register(RegisterRequest $request)
    {
        $response = $this->authService->register($request->validated());

        if(!empty($response['errors'])) {
            return response()->json([
                "success" => false,
                "errors" => $response['errors']
            ]);
        }

        if($response["success"]) {
            return response()->json($response, 201);
        }

        return response()->json($response, 500);
    }   

    public function logout(Request $request)
    {
        $response = $this->authService->logout($request->user());

        if($response["success"]) {
            return response()->json($response, 200);
        }

        return response()->json($response, 500);
    }

    public function me(Request $request)
    {
        $response = $this->authService->me($request->user());

        return response()->json($response, 200);
    }
}
