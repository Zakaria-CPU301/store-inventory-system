<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionHistoryController;
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

<<<<<<< Updated upstream
Route::get('products', [ProductController::class, 'index'])->name('products');
=======
>>>>>>> Stashed changes

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', action: function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('produk', [ProductController::class, 'index'])->name('product')->middleware(['auth', 'verified']);
    Route::get('pulsa', [BalanceController::class, 'index'])->name('balance');
    Route::get('kasbon', [TransactionHistoryController::class, 'debt'])->name('debt');
    Route::get('titipan', [TransactionHistoryController::class, 'depositThing'])->name('deposit');
    Route::get('asrama')->name('boarding');
    Route::get('catatan-aktifitas')->name('activity');
    Route::get('transaksi')->name('transaction');
    Route::get('grafik')->name('chart');
});

require __DIR__ . '/auth.php';
