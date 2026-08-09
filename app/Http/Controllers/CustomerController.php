<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Main/Customer', [
            'datas' => Customer::all()
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate(['customer' => 'required']);

        $customer = Customer::updateOrCreate(
            ['cust_name' => $validate['customer']],
            ['cust_name' => $validate['customer']]
        );

        $message = $customer->wasRecentlyCreated
            ? 'nama pembeli berhasil di tambahkan'
            : 'nama pembeli sudah ada';
        return Inertia::flash('success', $message)->back();
    }
}
