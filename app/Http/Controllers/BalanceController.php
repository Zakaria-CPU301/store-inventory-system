<?php

namespace App\Http\Controllers;

use App\Models\BalanceNumber;
use App\Models\Category;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BalanceController extends Controller
{
    public function index()
    {
        return Inertia::render('Main/Balance', [
            'balanceDatas' => BalanceNumber::with(['customers', 'categories'])->get()
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'custName' => 'required',
            'balanceNumber' => ['required', 'max:15'],
            'category' => 'required',
        ]);

        $customer = Customer::create(['fullname' => $validate['custName']]);
        $category = Category::where('category_name', $validate['category'])->first();


        BalanceNumber::create([
            'number' => $validate['balanceNumber'],
            'category_id' => $category->id,
            'customer_id' => $customer->id
        ]);

        return Inertia::flash('success', 'data berhasil di tambahkan')->back();
    }
}
