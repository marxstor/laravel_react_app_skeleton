<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthService
{
    public function register($data) 
    {
        $response = ["success" => false];

        try {
            $user = User::create($data);

            $token = $user->createToken('auth_token')->plainTextToken;

            $response = [
                "success"    => true, 
                "token"     => $token,
                "user"      => $user,
            ];
        } catch (\Exception $e) {
            $response["errors"] = "Registration failed.";
            $response["message"] = $e->getMessage();
        }

        return $response;
        
    }

    public function login($data) 
    {
        $response = ["success" => false];

        try {
            $user = User::where('email', $data['email'])->first();

            if(!$user || !Hash::check($data['password'], $user->password)) {
                return [
                    "success" => false,
                    "status"    => 'invalid_credentials',
                    "message"   => 'Invalid email or password'
                ];
            }

            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            $response = [
                "success"   => true,
                "status"    => 'authenticated',
                "token"     => $token,
                "user"      => $user
            ];

        } catch (\Exception $e) {
            $response["status"]     = "error";
            $response["errors"]     = "Login failed";
            $response["message"]    = $e->getMessage();
        }

        return $response;

    }

    public function logout($user) 
    {

        try {
            
            if(!$user) {
                return [
                    "success" => false,
                    "message" => "User not authenticated"
                ];
            }

            $token = $user->currentAccessToken();

            if(!$token) {
                return [
                    "success" => false,
                    "message" => "No active access token found."
                ];
            }

            $token->delete();

            return [
                "success" => true,
                "message" => "Logout successfull."
            ];

        } catch (\Exception $e) {
            Log::error('Logout failed', [
                'error' => $e->getMessage(),
                'user_id' => $user?->id
            ]);

            return [
                'success' => false,
                'message' => 'Something went wrong during logout.'
            ];
        }

    }

    public function me($user)
    {
        return [
            "success" => true,
            "user"  => $user
        ];
    }
}