<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index() {
        return Inertia::render('Main/Transaction', [
            
        ]);
    }

    public function scanning (Request $request) {
        // dump($request->codeScan);
        return back();
    }
}
