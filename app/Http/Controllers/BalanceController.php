<?php

namespace App\Http\Controllers;

use App\Models\Number;
use App\Models\Category;
use App\Models\Customer;
use App\Models\NumberCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BalanceController extends Controller
{
    public function index(Request $request)
    {
        $datas = NumberCustomer::with(['customers', 'number.categories']);
        if ($request->discovery) {
            $discovery = $request->discovery;

            $datas
                ->whereHas('number.categories', function ($e) use ($discovery) {
                    $e->where('category_name', 'LIKE', "%{$discovery[1]}%");
                })
                ->where(function ($query) use ($discovery) {
                    $query->when($discovery[0], function ($q, $value) {
                        $q->whereHas('customers', function ($e) use ($value) {
                            $e->where('cust_name', 'LIKE', "%{$value}%");
                        });
                        $q->orWhereHas('number', function ($e) use ($value) {
                            $e->where('number', 'LIKE', "%{$value}%");
                        });
                    });
                });
        }
        return Inertia::render('Main/Balance', [
            'balanceDatas' => $datas->get(),
            'customerDatas' => Customer::select('cust_name')->get(),
            'categoryDatas' => NumberCustomer::with('number.categories')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'customer' => 'required',
            'number' => ['required', 'max:15'],
            'category' => 'required',
        ]);

        $category = Category::where('category_name', $validate['category'])->first(); //

        $number = Number::firstOrCreate([
            'category_id' => $category->id,
            'number' => $validate['number']
        ]);

        $customer = Customer::firstOrCreate(['cust_name' => $validate['customer']]); //

        try {
            DB::beginTransaction();

            $numberCustomer = new NumberCustomer();
            $numberCustomer->number_id = $number->id;
            $numberCustomer->customer_id = $customer->id;

            $numberCustomer->saveOrFail();

            $message = 'data berhasil di tambahkan!';
            $icon = 'check-circle';

            DB::commit();
        } catch (\Throwable $err) {
            DB::rollBack();
            $message = 'gagal, silahkan pilih nomor lain';
            $icon = 'x-circle';
            $className = 'bg-red-500';
        }

        return Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $className ?? null])->back();
    }

    public function update(Request $request) {
        dd($request->all());
    }
}
