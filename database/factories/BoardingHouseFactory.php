<?php

namespace Database\Factories;

use App\Models\BoardingHouse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BoardingHouse>
 */
class BoardingHouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_image' => fake()->imageUrl(360, 360, 'animals', true, 'cats'),
            'price_per_month' => fake()->randomFloat(2, 700000, 700000),
            'customer_id' => fake()->numberBetween(1, 5),
            'property_id' => fake()->numberBetween(1, 5),
        ];
    }
}
