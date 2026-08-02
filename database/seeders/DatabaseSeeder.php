<?php

namespace Database\Seeders;

use App\Models\BalanceNumber;
use App\Models\BoardingHouse;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            'name' => 'Test User',
            'email' => 'asd@asd',
        ]);

        Category::factory(5)->create();

        Product::factory(10)->create();

        Customer::factory(5)->create();

        BalanceNumber::factory(5)->create();

        Property::factory(5)->create();

        BoardingHouse::factory(10)->create();
    }
}
