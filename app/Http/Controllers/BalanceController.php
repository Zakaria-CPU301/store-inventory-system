<?php

namespace App\Http\Controllers;

use App\Models\BalanceNumber;
use Inertia\Inertia;

class BalanceController extends Controller
{
    public function index()
    {
        return Inertia::render('Main/Balance', [
            'balanceDatas' => BalanceNumber::with(['customers', 'categories'])->get()
        ]);
    }
}
