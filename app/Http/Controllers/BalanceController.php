<?php

namespace App\Http\Controllers;

use App\Models\Number;
use App\Models\Category;
use App\Models\Customer;
use App\Models\NumberCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

class BalanceController extends Controller
{
    public function filters(Object $query, array $discovery)
    {
        return $query->whereHas('number.category', function ($e) use ($discovery) {
            $e->where('category_name', 'LIKE', "%{$discovery['category']}%");
        })
            ->where(function ($query) use ($discovery) {
                $query->when($discovery['keyword'], function ($q, $value) {
                    $q->whereHas('customer', function ($e) use ($value) {
                        $e->where('cust_name', 'LIKE', "%{$value}%");
                    });
                    $q->orWhereHas('number', function ($e) use ($value) {
                        $e->where('number', 'LIKE', "%{$value}%");
                    });
                });
            });
    }

    public function index(Request $request)
    {
        $datas = NumberCustomer::with(['customer', 'number.category']);
        if ($request->discovery || session('discovery')) {
            $discovery = $request->discovery ?? session('discovery');
            $datas = $this->filters($datas, $discovery);
        }

        return Inertia::render('Main/Balance', [
            'balanceDatas' => $datas->latest()->get(),
            'customerDatas' => Customer::select('cust_name')->get(),
            'numberCategoryDatas' => NumberCustomer::with('number.category')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'customer' => 'required',
            'number' => ['required', 'max:15'],
            'category' => 'required',
        ]);

        $category = Category::where('category_name', $validate['category'])->first();

        $number = Number::firstOrCreate([
            'category_id' => $category->id,
            'number' => $validate['number']
        ]);

        $customer = Customer::firstOrCreate(['cust_name' => $validate['customer']]);

        try {
            DB::beginTransaction();

            NumberCustomer::create([
                'customer_id' => $customer->id,
                'number_id' => $number->id,
            ]);

            $message = 'data berhasil di tambahkan!';
            $icon = 'check-circle';
            $className = 'bg-green-500';

            DB::commit();
        } catch (Throwable $err) {
            DB::rollBack();
            $message = 'gagal, silahkan pilih nomor lain';
            $icon = 'x-circle';
            $className = 'bg-red-500';
        }

        return Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $className ?? null])->back();
    }

    public function update(Request $request)
    {
        $validate = $request->validate([
            'customer' => ['required'],
            'number' => ['required', 'max:20'],
            'category' => ['required']
        ]);

        $customer = Customer::firstOrCreate(['cust_name' => $validate['customer']]);

        $category = Category::where('category_name', $validate['category'])->first();

        $number = Number::firstOrCreate([
            'category_id' => $category->id,
            'number' => $validate['number']
        ]);


        try {
            DB::beginTransaction();

            if (NumberCustomer::where([
                'number_id' => $number->id,
                'customer_id' => $customer->id,
            ])->exists()) {
                $message = 'tidak ada perubahan data!';
                $icon = 'exclamation-circle';
                $className = 'bg-yellow-600';
            } else {
                NumberCustomer::find($request->id)->update([
                    'number_id' => $number->id,
                    'customer_id' => $customer->id,
                ]);
                $message = 'data berhasil di edit!';
                $icon = 'check-circle';
                $className = 'bg-green-500';
            }

            DB::commit();
        } catch (Throwable) {
            DB::rollBack();
            $message = 'gagal, silahkan pilih nomor lain';
            $icon = 'x-circle';
            $className = 'bg-red-500';
        }

        Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $className ?? null]);
        return back()->with('discovery', $request->discovery);
    }

    public function destroy(Request $request)
    {
        Customer::find($request->id)->delete();
        Inertia::flash(['success' => 'nomor saldo berhasil di hapus', 'icon' => 'check-circle', 'classname' => 'bg-green-500'])->back();
        return back()->with('discovery', $request->discovery);
    }
}
