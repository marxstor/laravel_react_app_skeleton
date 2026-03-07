<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
}