<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Throwable;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validate = $request->validate([
            'category_name' => ['required', 'unique:categories,category_name']
        ], [
            'category_name.required' => 'nama kategori wajib diisi',
            'category_name.unique' => 'nama kategori ini sudah ada'
        ]);

        Category::create($validate);

        $message = 'kategori berhasil di tambahkan';
        $icon = 'check-circle';
        $classname = 'bg-green-500';

        return Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $classname])->back();
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $validate = $request->validate([
                'category_name' => ['required', Rule::unique('categories', 'category_name')->ignore($request->id)]
            ], [
                'category_name.required' => 'nama kategori wajib diisi',
                'category_name.unique' => 'nama kategori ini sudah ada'
            ]);

            if (Category::where([
                'category_name' => $validate['category_name']
            ])->exists()) {
                $message = 'tidak ada perubahan data kategori';
                $icon = 'exclamation-circle';
                $classname = 'bg-yellow-600';
            } else {
                Category::find($request->id)->update($validate);
                $message = 'kategori berhasil di edit';
                $icon = 'check-circle';
                $classname = 'bg-green-500';
            }
            Inertia::flash(['success' => $message, 'icon' => $icon, 'classname' => $classname]);
            return back()->with('discovery', $request->discovery);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            session()->flash('discovery', $request->discovery);
            throw $e;
        }
    }

    public function destroy(Request $request)
    {
        Category::find($request->id)->delete();
        Inertia::flash(['success' => 'nomor berhasil di hapus', 'icon' => 'check-circle', 'classname' => 'bg-green-500'])->back();
        return back()->with('discovery', $request->discovery);
    }
}
