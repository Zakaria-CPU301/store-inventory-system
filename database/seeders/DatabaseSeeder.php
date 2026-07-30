<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Zakariaasldkjasdlkj Ramadanasldkjasdlkj',
            'email' => 'asd@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('asd'),
            'remember_token' => Str::random(6)
        ]);
    }
}
