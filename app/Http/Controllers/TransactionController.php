<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TransactionController extends Controller
{
    public function printIndex() {
        return Inertia::render('Log/Print', [
            
        ]);
    }
}
