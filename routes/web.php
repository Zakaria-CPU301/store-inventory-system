<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UnitController;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('dashboard')->name('dashboard.')->group(function (): void {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('index');
    });
    Route::prefix('customer')->name('customer.')->group(function (): void {
        Route::match(['post', 'get'], '/', [CustomerController::class, 'index'])->name('index');
        Route::post('/insert', [CustomerController::class, 'store'])->name('store');
        Route::put('/update', [CustomerController::class, 'update'])->name('update');
        Route::post('/destroy', [CustomerController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('attribute')->name('attribute.')->group(function (): void {
        Route::match(['get', 'post'], '/', [AttributeController::class, 'index'])->name('index');
        Route::post('/category/insert', [CategoryController::class, 'store'])->name('category.store');
        Route::put('/category/update', [CategoryController::class, 'update'])->name('category.update');
        Route::post('/category/destroy', [CategoryController::class, 'destroy'])->name('category.destroy');
        Route::post('/unit/insert', [UnitController::class, 'store'])->name('unit.store');
        Route::put('/unit/update', [UnitController::class, 'update'])->name('unit.update');
        Route::post('/unit/destroy', [UnitController::class, 'destroy'])->name('unit.destroy');
    });
    Route::prefix('product')->name('product.')->group(function (): void {
        Route::get('', [ProductController::class, 'index'])->name('index');
        Route::post('/insert', [ProductController::class, 'store'])->name('store');
    });
    Route::prefix('balance')->name('balance.')->group(function (): void {
        Route::match(['get', 'post'], '/', [BalanceController::class, 'index'])->name('index');
        Route::post('/insert', [BalanceController::class, 'store'])->name('store');
        Route::put('/update', [BalanceController::class, 'update'])->name('update');
        Route::post('/destroy', [BalanceController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('transaction')->name('transaction.')->group(function () {
        Route::match(['get', 'post'], '/', [TransactionController::class, 'index'])->name('index');
        Route::post('/scanning', [TransactionController::class, 'scanning'])->name('scanning');
        Route::post('/invoice', [TransactionController::class, 'invoice'])->name('invoice');
    });
    // Route::get('debt', [DebtController::class, 'index'])->name('debt');
    // Route::get('boarding', [BoardingHouseController::class, 'index'])->name('boarding');
    // Route::get('property', [PropertyController::class, 'index'])->name('property');
    // Route::get('catatan-aktifitas')->name('activity');
    // Route::get('grafik')->name('chart');
});

Route::get('mobile-test', function() {
    return view('asd');
    });

require __DIR__ . '/auth.php';
