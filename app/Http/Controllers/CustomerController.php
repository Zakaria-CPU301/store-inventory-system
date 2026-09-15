<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $datas = Customer::query();
        if ($request->discovery || session('discovery')) {
            $keyword = $request->discovery['keyword'] ?? session('discovery')['keyword'];
            $datas->whereAny(['cust_name', 'telp'], 'LIKE', "%{$keyword}%");
        }
        return Inertia::render('Main/Customer', [
            'datas' => $datas->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'cust_name' => ['required', 'unique:customers,cust_name'],
            'telp' => ['nullable', 'max:15', 'unique:customers,telp']
        ], [
            'cust_name.required' => 'Nama pelanggan wajib diisi',
            'cust_name.unique' => 'Nama pelanggan sudah ada',
            'telp.unique' => 'Nomor telepon sudah ada'
        ]);

        Customer::create(['cust_name' => $validate['cust_name'], 'telp' => $validate['telp']]);

        $message = 'pelanggan berhasil di tambahkan';
        $icon = 'check-circle';
        $className = 'bg-green-500';

        return Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $className])->back();
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $validate = $request->validate([
                'cust_name' => ['required', Rule::unique('customers', 'cust_name')->ignore($request->id)],
                'telp' => ['nullable', 'max:15', Rule::unique('customers', 'telp')->ignore($request->id)]
            ], [
                'cust_name.required' => 'Nama pelanggan wajib diisi',
                'cust_name.unique' => 'Nama pelanggan sudah ada',
                'telp.unique' => 'Nomor telepon sudah ada'
            ]);

            if (Customer::where([
                'cust_name' => $validate['cust_name'],
                'telp' => $validate['telp']
            ])->exists()) {
                $message = 'tidak ada perubahan data';
                $icon = 'exclamation-circle';
                $className = 'bg-yellow-600';
            } else {
                Customer::find($request->id)->update($validate);
                $message = 'Pelanggan berhasil di edit';
                $icon = 'check-circle';
                $className = 'bg-green-500';
            }
            Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $className]);
            DB::commit();
        } catch (Throwable $err) {
            DB::rollback();
            session()->flash('discovery', $request->discovery);
            throw $err;
        }
        return back()->with('dicovery', $request->discovery);
    }

    public function destroy(Request $request)
    {
        Customer::find($request->id)->delete();
        Inertia::flash(['success' => 'nomor berhasil di hapus', 'icon' => 'check-circle', 'classname' => 'bg-green-500'])->back();
        return back()->with('discovery', $request->discovery);
    }
}
