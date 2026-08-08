<?php

namespace App\Http\Controllers;

use App\Models\Number;
use App\Models\Category;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NumberController extends Controller
{
    public function index()
    {
        return Inertia::render('Main/Balance', [
            'balanceDatas' => Number::with(['customers', 'categories'])->get()
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'customer_id' => 'required',
            'number' => ['required', 'max:15'],
            'category_id' => 'required',
        ]);

        $customer = Customer::firstOrCreate(['fullname' => $validate['customer_id']]);
        $category = Category::where('category_name', $validate['category_id'])->first();

        $balance = Number::updateOrCreate(
            [
                'category_id' => $category->id,
                'number' => $validate['number'],
                'customer_id' => $customer->id,
            ],
            [
                'category_id' => $category->id,
                'number' => $validate['number'],
                'customer_id' => $customer->id,
            ]
        );

        $message = $balance->wasRecentlyCreated ? 'data berhasil di tambahkan!' : 'data sudah ada';

        return Inertia::flash('success', $message)->back();
    }
}
