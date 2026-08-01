<?php

namespace Database\Factories;

use App\Models\BalanceNumber;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BalanceNumber>
 */
class BalanceNumberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => fake()->phoneNumber(),
            'category_id' => fake()->numberBetween(1, 5),
            'customer_id' => fake()->numberBetween(1, 5),
        ];
    }
}
