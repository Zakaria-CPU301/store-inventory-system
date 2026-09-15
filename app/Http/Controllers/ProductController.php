<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function filters(Object $query, array $discovery) {
        return $query->where(['product_name', 'description'], $discovery);
    }
    
    public function index(Request $request)
    {
        $datas = Product::with(['categories']);
        if ($request->discovery || session('discovery')) {
            $datas = $this->filters($datas, $request->discovery);
        }
        
        return Inertia::render('Main/Product', [
            'productDatas' => $datas->get(),
            'categoryDatas' => Category::whereNotIn('category_name', ['token', 'dana', 'pulsa', 'paket data'])->get()
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => ['required'],
            'image' => ['nullable', File::image()->max('500kb')],
            'qty' => ['nullable', 'numeric', 'min:0'],
            'category' => ['required'],
            'desc' => ['nullable'],
            'price' => ['required', 'numeric', 'min:0']
        ]);

        $path = $request->file('image')->store('image-products', 'public');
        $path = str_replace('image-products/', '', $path);

        Product::create([
            'product_name' => $validate['title'],
            'product_image' => $path,
            'qty' => $validate['qty'],
            'price' => $validate['price'],
            'description' => $validate['desc'],
            'category_id' => $validate['category'],
        ]);
    }
}
