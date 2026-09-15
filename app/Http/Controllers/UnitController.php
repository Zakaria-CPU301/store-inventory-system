<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class UnitController extends Controller
{
    public function store(Request $request)
    {
        $validate = $request->validate([
            'unit_name' => ['required', 'unique:units,unit_name']
        ], [
            'unit_name.required' => 'nama satuan wajib diisi',
            'unit_name.unique' => 'nama satuan ini sudah ada'
        ]);

        Unit::create($validate);

        $message = 'satuan berhasil di tambahkan';
        $icon = 'check-circle';
        $classname = 'bg-green-500';
        return Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $classname])->back();
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $validate = $request->validate([
                'unit_name' => ['required', Rule::unique('units', 'unit_name')->ignore($request->id)]
            ], [
                'unit_name.required' => 'nama satuan wajib diisi',
                'unit_name.unique' => 'nama satuan ini sudah ada'
            ]);

            if (Unit::where([
                'unit_name' => $validate['unit_name']
            ])->exists()) {
                $message = 'tidak ada perubahan data satuan';
                $icon = 'exclamation-circle';
                $classname = 'bg-yellow-600';
            } else {
                Unit::find($request->id)->update($validate);
                $message = 'satuan berhasil di edit';
                $icon = 'check-circle';
                $classname = 'bg-green-500';
            }

            Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $classname]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            session()->flash('discovery', $request->discovery);
            throw $e;
        }

        return back()->with('discovery', $request->discovery);
    }

    public function destroy(Request $request)
    {
        Unit::find($request->id)->delete();
        Inertia::flash(['success' => 'satuan berhasil di hapus', 'icon' => 'check-circle', 'classname' => 'bg-green-500'])->back();
        return back()->with('discovery', $request->discovery);
    }
}
