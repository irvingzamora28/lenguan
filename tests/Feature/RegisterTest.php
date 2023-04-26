<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use WithFaker;

    public function testRegister()
    {
        $name = $this->faker->name;
        $email = $this->faker->unique()->safeEmail;
        // generate password with at least 8 characters
        $password = $this->faker->regexify('[A-Za-z0-9]{8}');

        $data = [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ];
        $response = $this->postJson('/api/register', $data);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'User registered successfully. Please check your email to verify your account.']);

        $this->assertDatabaseHas('users', [
            'name' => $name,
            'email' => $email,
        ]);

        $user = User::where('email', $email)->first();
        $this->assertNotNull($user->username);
        $this->assertStringContainsString(strstr($email, '@', true), $user->username);
        $this->assertNotEquals($email, $user->username . '@mail.com');
        $this->assertTrue(User::where('username', $user->username)->count() == 1);
    }
}
