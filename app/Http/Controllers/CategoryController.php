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

        Category::updateOrCreate(['category_name' => $validate['category']], ['category_name' => $validate['category']]);

        return Inertia::flash('success', 'berhasil ditambahkan')->back();
    }
}
