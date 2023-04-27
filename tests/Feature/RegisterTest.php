<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;
use function Tests\createUser;

class RegisterTest extends TestCase
{
    use WithFaker, DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutExceptionHandling(); // Disable exception handling for easier debugging

        $this->app->make(Kernel::class)->pushMiddleware(VerifyCsrfToken::class);
    }

    public function testValidRegistration(): void
    {


        $name = $this->faker->name;
        $email = $this->faker->unique()->safeEmail;
        $password = $this->faker->regexify('[A-Za-z0-9]{8}');

        $data = [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ];
        $token = csrf_token();
        $headers = ['X-XSRF-TOKEN' => $token]; // Set the CSRF token in the headers
        // dd(csrf_token());
        // $data = [
        //     'name' => "John Doe123",
        //     'email' => "johndoe123@email.com",
        //     'password' => "password",
        //     'password_confirmation' => "password",
        // ];
        // $user = User::factory()->create([
        //     'name' => 'John Doe',
        //     'email' => 'john@example.com',
        //     'password' => "password",
        //     'password_confirmation' => "password",
        // ]);

        // // Check if the user record exists in the database
        // $this->assertDatabaseHas('users', [
        //     '_id' => $user->_id,
        //     'name' => 'John Doe',
        //     'email' => 'john@example.com',
        //     'password' => "password",
        //     'password_confirmation' => "password",
        // ]);
        // $user = User::factory()->create();
        // $this->assertDatabaseCount('users', 1);

        // $this->assertDatabaseHas('users', [
        //     "_id" => $user->_id,
        //     'name' => $user->name,
        //     'email' => $user->email,
        //     'password' => $user->password,
        //     'password_confirmation' => $user->password
        // ]);
        $response = $this->withHeaders($headers)->postJson('/api/register', $data);
        // dd($response->getContent());
        $response->assertStatus(200)
            ->assertJson(['message' => 'User registered successfully. Please check your email to verify your account.']);
        // dd($response);
        // $user = User::first();
        // dd($user->username);
        // dd(count($users));
        // Create a user record using the UserFactory
        // $user = User::factory()->create($data);

        // Check if the user record exists in the database
        // $this->assertDatabaseHas('users', array_merge([ 'id' => $user->id], $data));
        // $user = UserFactory::new()->of(User::class)->create($data);
        // $this->assertDatabaseCount('users', 1);
        // $this->assertDatabaseHas('users', [
        //     'name' => $name,
        //     'email' => $email,
        // ]);

        // dd($email);
        $user = User::where('email', $email)->first();
        $users = User::all();
        dd(count($users));
        $this->assertNotNull($user->username);
        $this->assertStringContainsString(strstr($email, '@', true), $user->username);
        $this->assertNotEquals($email, $user->username . '@mail.com');
        $this->assertMatchesRegularExpression('/^' . preg_quote(strstr($email, '@', true), '/') . '\d*$/', $user->username);

    }

    // public function testNonUniqueEmail(): void
    // {
    //     $existingUser = User::factory()->create();

    //     $data = [
    //         'name' => $this->faker->name,
    //         'email' => $existingUser->email,
    //         'password' => $this->faker->password,
    //         'password_confirmation' => $this->faker->password,
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(422)
    //              ->assertJsonValidationErrors(['email']);
    // }

    // public function testMissingNameField(): void
    // {
    //     $data = [
    //         'email' => $this->faker->unique()->safeEmail,
    //         'password' => $this->faker->password,
    //         'password_confirmation' => $this->faker->password,
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(422)
    //              ->assertJsonValidationErrors(['name']);
    // }

    // public function testInvalidEmailFormat(): void
    // {
    //     $data = [
    //         'name' => $this->faker->name,
    //         'email' => 'invalid-email-format',
    //         'password' => $this->faker->password,
    //         'password_confirmation' => $this->faker->password,
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(422)
    //              ->assertJsonValidationErrors(['email']);
    // }

    // public function testShortPassword(): void
    // {
    //     $data = [
    //         'name' => $this->faker->name,
    //         'email' => $this->faker->unique()->safeEmail,
    //         'password' => 'short',
    //         'password_confirmation' => 'short',
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(422)
    //              ->assertJsonValidationErrors(['password']);
    // }

    // public function testNonMatchingPasswords(): void
    // {


    //     $data = [
    //         'name' => $this->faker->name,
    //         'email' => $this->faker->unique()->safeEmail,
    //         'password' => $this->faker->password,
    //         'password_confirmation' => 'does-not-match',
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(422)
    //              ->assertJsonValidationErrors(['password']);
    // }

    // public function testExistingUsername(): void
    // {
    //     $existingUser = User::factory()->create();
    //     $existingUsername = str_replace('@', '', $existingUser->email);

    //     $data = [
    //         'name' => $this->faker->name,
    //         'email' => $existingUser->email,
    //         'password' => $this->faker->password,
    //         'password_confirmation' => $this->faker->password,
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(200)
    //              ->assertJson(['message' => 'User registered successfully. Please check your email to verify your account.']);

    //     $this->assertDatabaseHas('users', [
    //         'name' => $data['name'],
    //         'email' => $data['email'],
    //         'username' => $existingUsername . '1',
    //     ]);
    // }

    // public function testExistingUsernameWithMultipleUsers(): void
    // {
    //     $existingUser1 = User::factory()->create();
    //     $existingUsername = str_replace('@', '', $existingUser1->email);

    //     $existingUser2 = User::factory()->create(['username' => $existingUsername . '1']);

    //     $data = [
    //         'name' => $this->faker->name,
    //         'email' => $existingUser1->email,
    //         'password' => $this->faker->password,
    //         'password_confirmation' => $this->faker->password,
    //     ];

    //     $response = $this->postJson('/api/register', $data);

    //     $response->assertStatus(200)
    //              ->assertJson(['message' => 'User registered successfully. Please check your email to verify your account.']);

    //     $this->assertDatabaseHas('users', [
    //         'name' => $data['name'],
    //         'email' => $data['email'],
    //         'username' => $existingUsername . '2',
    //     ]);
    // }
}
