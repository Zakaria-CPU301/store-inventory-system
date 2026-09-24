<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionLog;
use App\Models\Unit;
use App\Models\UnitProduct;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function filters(Object $query, array $discovery)
    {
        return $query->where(['name', 'description'], $discovery);
    }

    public function index(Request $request)
    {
        $datas = Product::with(['category']);
        if ($request->discovery || session('discovery')) {
            $datas = $this->filters($datas, $request->discovery);
        }

        return Inertia::render('Main/Product', [
            'productDatas' => $datas->get(),
            'categoryDatas' => Category::whereNotIn('category_name', ['token', 'dana', 'pulsa', 'paket data'])->get(),
            'unitDatas' => Unit::all()
        ]);
    }

    public function store(Request $request)
    {
        // dd($request);
        $validate = $request->validate([
            'barcode' => 'nullable',
            'title' => ['required', 'max:225'],
            'units' => 'required',
            'units.*.unit' => ['required'],
            'units.*.qty' => ['required', 'numeric', 'min:0'],
            'units.*.price' => ['required', 'numeric', 'min:500'],
            'image' => ['nullable', File::image()->max('500kb')],
            'category' => ['nullable'],
            'desc' => ['nullable'],
        ], [
            'title.required' => 'nama produk tidak boleh kosong',
            'title.max' => 'nama produk terlalu panjang',
            'units.*.unit.required' => 'satuan tidak boleh kosong',
            'units.*.qty.required' => 'jumlah produk tidak boleh kosong',
            'units.*.price.required' => 'jumlah produk tidak boleh kosong',
            'units.*.price.min' => 'harga produk minimal Rp.500'
        ]);
        // foreach($request->units as $unit) ;
dd($request->units);
        $path = null;
        if ($request->file('image')) {
            $path = $request->file('image')->store('image-products', 'public');
            $path = str_replace('image-products/', '', $path);
        }

        $category = Category::firstOrCreate(['category_name' => $validate['category']], ['category_name' => $validate['category']]);

        $product = Product::create([
            'barcode' => (int) ($validate['barcode']),
            'name' => $validate['title'],
            'product_image' => $path,
            'description' => $validate['desc'],
            'category_id' => $category->id,
        ]);

        // UnitProduct::create(['product_id' => $product->id, 'unit_id' => $re]);

        $invoice = Transaction::where('qrcode', Inertia::getShared('codeScan'))->first();
        TransactionLog::create([
            'transaction_id' => $invoice->id,
            'invoice_log_type' => Product::class,
            'invoice_log_id' => $product->id,
        ]);
    }
}
