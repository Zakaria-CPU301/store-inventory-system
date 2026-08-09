<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render(('Main/Category'), ['datas' => Category::all()]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'category' => 'required'
        ]);

        $category = Category::updateOrCreate(['category_name' => $validate['category']], ['category_name' => $validate['category']]);

        $message = $category->wasRecentlyCreated
            ? 'kategori berhasil di tambahkan'
            : 'kategori sudah ada';
        return Inertia::flash('success', $message)->back();
    }
}
