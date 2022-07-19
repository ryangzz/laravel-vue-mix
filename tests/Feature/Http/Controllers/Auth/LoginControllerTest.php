<?php

namespace Tests\Feature\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_login_form()
    {
        $response = $this->get(route('login'));
        $response->assertViewIs('admin.login');
        $response->assertStatus(200);
    }

    public function test_login_post(){
        $user = User::factory()->create();

        $response = $this->post(route('login'));
        $response->assertStatus(302);



        $response = $this->post(route('login'), ['email' => $user->email, 'password' => 'password']);
        $response->assertStatus(302);
        $response->assertRedirect(route('admin.home'));
    }
}
