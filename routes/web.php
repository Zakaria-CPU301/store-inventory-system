<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\NumberController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
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

    Route::prefix('dashboard')->name('dashboard.')->group(function (): void {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('index');
    });
    Route::prefix('customer')->name('customer.')->group(function (): void {
        Route::get('/', [CustomerController::class, 'index'])->name('index');
        Route::post('/tambah', [CustomerController::class, 'store'])->name('store');
    });
    Route::prefix('category')->name('category.')->group(function (): void {
        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::post('/tambah', [CategoryController::class, 'store'])->name('store');
    });
    Route::prefix('product')->name('product.')->group(function (): void {
        Route::get('', [ProductController::class, 'index'])->name('index');
        Route::post('/tambah', [ProductController::class, 'store'])->name('store');
    });
    Route::prefix('balance')->name('balance.')->group(function (): void {
        Route::match(['get', 'post'], '/', [BalanceController::class, 'index'])->name('index');
        Route::post('/tambah', [BalanceController::class, 'store'])->name('store');
        Route::put('/update', [BalanceController::class, 'update'])->name('update');
    });
    // Route::get('debt', [DebtController::class, 'index'])->name('debt');
    // Route::get('boarding', [BoardingHouseController::class, 'index'])->name('boarding');
    // Route::get('property', [PropertyController::class, 'index'])->name('property');
    // Route::get('catatan-aktifitas')->name('activity');
    // Route::get('grafik')->name('chart');
});

require __DIR__ . '/auth.php';
