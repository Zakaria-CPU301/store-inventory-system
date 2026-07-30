<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BalanceController extends Controller
{
    public function index() {
        return Inertia::render('Main/Balance');
    }
}
