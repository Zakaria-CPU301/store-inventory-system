<?php

namespace Database\Seeders;

use App\Models\BalanceNumber;
use App\Models\BoardingHouse;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Property;
use App\Models\Transaction;
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

        $hashId = Str::upper(Str::uuid());
        $makeQRCode = "faktur-1.{$hashId}";
        Transaction::factory()->create([
            'qrcode' => $makeQRCode,
            'incoming' => false,
            'printing' => true,
            'status' => false,
        ]);

        Category::factory()->createMany([
            ['category_name' => 'pulsa'],
            ['category_name' => 'token'],
            ['category_name' => 'paket data'],
            ['category_name' => 'dana'],
        ]);

        // Category::factory(15)->create();

        // Product::factory(30)->create();

        // Customer::factory(50)->create();

        // BalanceNumber::factory(15)->create();

        // Property::factory(5)->create();

        // BoardingHouse::factory(10)->create();
    }
}
