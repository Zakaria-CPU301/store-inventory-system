<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_image' => fake()->imageUrl(360, 360, 'animals', true, 'cats'),
            'product_name' => fake()->words(3, true),
            'price' => fake()->randomFloat(2, 0, 10000000),
            'qty' => fake()->numberBetween(1, 50),
            'unit' => fake()->randomElement(['pcs', 'dus', 'bks']),
            'status' => fake()->randomElement(['available', 'empty', 'blocked']),
            'description' => fake()->text(),
            'category_id' => fake()->numberBetween(1, 15)
        ];
    }
}
