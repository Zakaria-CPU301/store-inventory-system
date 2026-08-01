<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DebtController extends Controller
{
    public function index() {
        return Inertia::render('Main/Debt', [
    
        ]);
    }
}
