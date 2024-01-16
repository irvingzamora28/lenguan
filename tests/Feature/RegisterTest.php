<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

/**
 * Unit test class for user registration functionality.
 *
 * @package     App\Tests\Unit
 */
class RegisterTest extends TestCase
{
    /**
     * Trait providing the Faker library to generate random data for testing.
     */
    use WithFaker;

    /**
     * Trait for running database migrations before each test.
     */
    use DatabaseMigrations;

    /**
     * Set up the test environment before each test.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutExceptionHandling(); // Disable exception handling for easier debugging

        // Add middleware to verify CSRF token
        $this->app->make(Kernel::class)->pushMiddleware(VerifyCsrfToken::class);
    }

    /**
     * Test user registration with valid input data.
     */
    public function testValidRegistration(): void
    {
        // Generate random user data
        $name = $this->faker->name;
        $email = $this->faker->unique()->safeEmail;
        $password = $this->faker->regexify('[A-Za-z0-9]{8}');
        $data = [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
            'guest_data' => null,
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(201)
            ->assertJson(['message' => 'Welcome! Please check your email to verify your account. Meantime you can have access, enjoy!']);

        // Check that a username was generated for the user with the correct format
        $user = User::where('email', $email)->first();
        $this->assertNotNull($user->username);
        $this->assertStringContainsString(strstr($email, '@', true), $user->username);
        $this->assertNotEquals($email, $user->username . '@mail.com');
        $this->assertMatchesRegularExpression('/^' . preg_quote(strstr($email, '@', true), '/') . '\d*$/', $user->username);
    }

    /**
     * Test user registration with non-unique email input data.
     */
    public function testNonUniqueEmail(): void
    {
        // Generate random user data with an email that already exists in the database
        $existingUser = User::factory()->create();
        $data = [
            'name' => $this->faker->name,
            'email' => $existingUser->email,
            'password' => $this->faker->password,
            'password_confirmation' => $this->faker->password,
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test user registration with missing name input data.
     */
    public function testMissingNameField(): void
    {
        // Generate random user data with a missing name field
        $data = [
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
            'password_confirmation' => $this->faker->password,
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    /**
     * Test user registration with invalid email format input data.
     */
    public function testInvalidEmailFormat(): void
    {
        // Generate random user data with an invalid email format
        $password = $this->faker->regexify('[A-Za-z0-9]{8}');
        $data = [
            'name' => $this->faker->name,
            'email' => 'invalid-email-format',
            'password' => $password,
            'password_confirmation' => $password,
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test user registration with a short password input data.
     */
    public function testShortPassword(): void
    {
        // Generate random user data with a short password
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'short',
            'password_confirmation' => 'short',
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test user registration with non-matching passwords input data.
     */
    public function testNonMatchingPasswords(): void
    {
        // Generate random user data with non-matching passwords
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
            'password_confirmation' => 'does-not-match',
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test user registration with an existing username generated with an existing email but with a different domain input data.
     */
    public function testExistingUsernameGeneratedWithExistingEmailWithDifferentDomain(): void
    {
        // Generate random user data with an email that already exists in the database but with a different domain
        $existingUser = User::factory()->create();
        $existingUsername = $existingUser->username;
        $existingEmailDifferentDomain = str_replace('@', '@sameemaildifferentdomain.com', $existingUser->email);
        $password = $this->faker->regexify('[A-Za-z0-9]{8}');
        $data = [
            'name' => $this->faker->name,
            'email' => $existingEmailDifferentDomain,
            'password' => $password,
            'password_confirmation' => $password,
            'guest_data' => null,
        ];

        // Make a POST request to the registration endpoint and check the response
        $response = $this->postJson('/api/register', $data);
        $response->assertStatus(201)
            ->assertJson(['message' => 'Welcome! Please check your email to verify your account. Meantime you can have access, enjoy!']);

        // Check that the user was created with the correct username
        $this->assertDatabaseHas('users', [
            'name' => $data['name'],
            'email' => $data['email'],
            'username' => $existingUsername . '1',
        ]);
    }
}
