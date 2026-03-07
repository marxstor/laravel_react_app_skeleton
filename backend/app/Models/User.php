<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken; 

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Generate a new access token for the user.
     * Revokes all previous tokens first (single session).
     */
    public function generateToken(string $tokenName = 'auth_token'): string
    {
        // Revoke all existing tokens before creating new one
        $this->tokens()->delete();

        return $this->createToken($tokenName)->plainTextToken;
    }

    /**
     * Generate a new access token without revoking previous ones.
     * Use this for multi-device / multi-session support.
     */
    public function generateTokenMultiDevice(string $tokenName = 'auth_token'): string
    {
        return $this->createToken($tokenName)->plainTextToken;
    }

    /**
     * Generate a token with specific abilities/permissions.
     */
    public function generateTokenWithAbilities(array $abilities, string $tokenName = 'auth_token'): string
    {
        $this->tokens()->delete();

        return $this->createToken($tokenName, $abilities)->plainTextToken;
    }

    /**
     * Revoke the current token (logout current session).
     */
    public function revokeCurrentToken(): void
    {
        $this->currentAccessToken()->delete();
    }

    /**
     * Revoke all tokens (logout all devices).
     */
    public function revokeAllTokens(): void
    {
        $this->tokens()->delete();
    }
}
