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

        if (!session('codeInvoice')) {
            $latestInvoice = Transaction::latest()->first()->qrcode;
            session()->put('codeInvoice', $latestInvoice);
            Inertia::share('codeInvoice', $latestInvoice);
        }

        return Inertia::render('Main/Product', [
            'productDatas' => $datas->get(),
            'categoryDatas' => Category::whereNotIn('category_name', ['token', 'dana', 'pulsa', 'paket data'])->get(),
            'unitDatas' => Unit::all()
        ]);
    }

    public function initStore(Request $request)
    {
        $validate = $request->validate([
            'barcode' => 'nullable',
            'title' => ['required', 'max:225'],
            'units.*.unit' => ['required'],
            'units.*.atom' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', File::image()->max('500kb')],
            'category' => ['nullable'],
            'desc' => ['nullable'],
        ], [
            'title.required' => 'nama produk tidak boleh kosong',
            'title.max' => 'nama produk terlalu panjang',
            'units.*.unit.required' => 'satuan tidak boleh kosong',
            'units.*.atom.required' => 'jumlah produk tidak boleh kosong',
        ]);

        $path = null;
        if ($request->file('image')) {
            $path = $request->file('image')->store('image-products', 'public');
            $path = str_replace('image-products/', '', $path);
        }

        $product = Product::create([
            'barcode' => (int) ($validate['barcode']),
            'name' => $validate['title'],
            'product_image' => $path,
            'description' => $validate['desc'],
            'category_id' => $validate['category'],
        ]);

        foreach ($validate['units'] as  $units) {
            UnitProduct::create([
                'total_atom' => $units['atom'],
                'product_id' => $product->id,
                'unit_id' => $units['unit']
            ]);
        }

        $invoice = Transaction::where('qrcode', Inertia::getShared('codeInvoice'))->first();
        TransactionLog::create([
            'invoice_log_type' => Product::class,
            'invoice_log_id' => $product->id,
            'transaction_id' => $invoice->id,
        ]);

        return Inertia::flash(['barcode' => $product->barcode, 'purchase_transaction' => true, 'timestamp' => now()])->back();
    }

    public function purchaseStore(Request $request)
    {
        $validate = $request->validate([
            'units.*.price' => ['required', 'numeric', 'min:500'],
        ], [
            'units.*.price.required' => 'jumlah produk tidak boleh kosong',
            'units.*.price.min' => 'harga produk minimal Rp.500'
        ]);
    }
}
