<?php

namespace Tests\Feature;

use App\Models\FormSubmission;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FormSubmitControllerTest extends TestCase
{
    /**
     * Trait for running database migrations before each test.
     */
    use DatabaseMigrations;
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutExceptionHandling(); // Disable exception handling for easier debugging
    }

    /** @test */
    public function it_handles_contact_form_submission()
    {
        $formData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Hello, this is a test message.',
        ];

        $response = $this->postJson('/api/form/contact', $formData);

        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'Form submitted successfully']);

        $submission = FormSubmission::all()->first();
        $this->assertNotNull($submission);
        $this->assertEquals('John Doe', $submission->data['name']);
        $this->assertEquals('john@example.com', $submission->data['email']);
        $this->assertEquals('Hello, this is a test message.', $submission->data['message']);
    }
}
