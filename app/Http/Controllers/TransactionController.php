<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionLog;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transaction = Transaction::query();
        if (!$transaction->where('printing', true)->exists()) {
            $this->createInvoice($transaction, false);
        } else if ($request->discovery) {
            session()->put('codeInvoice', $request->discovery['invoice']);
            Inertia::share('codeInvoice', $request->discovery['invoice']);
        } else if (!session('codeInvoice')) {
            $latestInvoice = Transaction::latest()->first()->qrcode;
            session()->put('codeInvoice', $latestInvoice);
            Inertia::share('codeInvoice', $latestInvoice);
        }

        return Inertia::render('Main/Transaction', [
            'datas' => $transaction->with(['transactionLogs.invoice_log'])->where('printing', true)->latest()->get(),
            'categoryDatas' => Category::whereNotIn('category_name', ['pulsa', 'dana', 'paket data', 'listrik'])->get(),
            'unitDatas' => Unit::all()
        ]);
    }

    public function dataIntoInvoice(Request $request)
    {
        $invoice = Transaction::where('qrcode', 'LIKE', "{$request->code}")->first();
        $transaction = Transaction::where('qrcode', Inertia::getShared('codeInvoice'))->first();
        $product = Product::where('barcode', $request->code)->first();
        $qrcodeInvoice = str_contains($request->code, 'faktur-');
        if ($qrcodeInvoice) { // QRCode faktur-
            $invoice->update(['printing' => true]);
        } else {
            if (ctype_digit($request->code)) { // barcode
                if ($product && !$transaction->incoming) { // produk sudah ada dan pengeluaran
                    TransactionLog::create([
                        'transaction_id' => $transaction->id,
                        'invoice_log_type' => Product::class,
                        'invoice_log_id' => $product->id
                    ]);
                } else if ($transaction->incoming) { // pemasukan
                    if ($product) Inertia::flash(['barcode' => $request->code, 'purchase_transaction' => true, 'timestamp' => now()]);
                    else Inertia::flash(['barcode' => $request->code, 'timestamp' => now()]);
                } else { // produk belum ada
                    $classname = 'bg-orange-500';
                    $icon = 'exclamation-circle';
                    $success = 'produk tidak ada';
                    Inertia::flash(['success' => $success, 'icon' => $icon, 'classname' => $classname]);
                }
            } else {
                $classname = 'bg-red-500';
                $icon = 'x-circle';
                $success = 'QRCode tidak terdaftar';
                Inertia::flash(['success' => $success, 'icon' => $icon, 'classname' => $classname]);
            }
        }

        return back();
    }

    public function invoice(Request $request)
    {
        $this->createInvoice(Transaction::query(), $request->incoming);
    }

    public function createInvoice(Object $transaction, bool $mutationMethod)
    {
        $getLatestId = Transaction::latest()->first()->id + 1;
        $hashId = Str::upper(Str::uuid());
        $makeQRCode = "faktur-{$getLatestId}.{$hashId}";
        $transaction->create([
            'qrcode' => $makeQRCode,
            'incoming' => $mutationMethod,
            'printing' => true,
            'status' => false
        ]);
        Inertia::share('codeInvoice', $makeQRCode);
        session()->put('codeInvoice', $makeQRCode);
    }
}
