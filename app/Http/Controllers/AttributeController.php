<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeController extends Controller
{
    public function index(Request $request)
    {
        $datas = null;
        if ($request->discovery || session('discovery')) {
            $attribute = $request->discovery['attribute'] ?? session('discovery')['attribute'];
            $keyword = $request->discovery['keyword'] ?? session('discovery')['keyword'] ?? null;

            Inertia::share('attribute', $attribute); // asynchronous
            session()->put('attribute', $attribute); // permanently

            $datas = ($attribute === 'satuan')
                ? Unit::where('unit_name', 'LIKE', "%{$keyword}%")
                : Category::where('category_name', 'LIKE', "%{$keyword}%");
        } else {
            $datas = session('attribute') === 'satuan' ? Unit::query() : Category::query();
        }
        return Inertia::render(('Main/Attribute'), ['datas' => $datas->latest()->get()]);
    }
}
