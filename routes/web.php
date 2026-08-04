<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\BoardingHouseController;

use App\Http\Controllers\DebtController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('produk', [ProductController::class, 'index'])->name('product')->middleware(['auth', 'verified']);
    Route::post('tambah-produk', [ProductController::class, 'store'])->name('product-store');
    Route::get('pulsa', [BalanceController::class, 'index'])->name('balance');
    Route::get('kasbon', [DebtController::class, 'index'])->name('debt');
    Route::get('asrama', [BoardingHouseController::class, 'index'])->name('boarding');
    Route::get('properti', [PropertyController::class, 'index'])->name('property');
    Route::get('catatan-aktifitas')->name('activity');
    Route::get('grafik')->name('chart');
});

require __DIR__ . '/auth.php';
