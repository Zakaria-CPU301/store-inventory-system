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
            session()->put('codeScan', $request->discovery['invoice']);
            Inertia::share('codeScan', $request->discovery['invoice']);
        } else if (!session('codeScan')) {
            $latestInvoice = Transaction::latest()->first()->qrcode;
            session()->put('codeScan', $latestInvoice);
            Inertia::share('codeScan', $latestInvoice);
        }

        return Inertia::render('Main/Transaction', [
            'datas' => $transaction->with(['transactionLogs.invoice_log'])->where('printing', true)->latest()->get(),
            'categoryDatas' => Category::whereNotIn('category_name', ['pulsa', 'dana', 'paket data', 'listrik'])->get(),
            'unitDatas' => Unit::all()
        ]);
    }

    public function scanning(Request $request)
    {
        $invoice = Transaction::where('qrcode', 'LIKE', "{$request->code}")->first();
        $product = Product::where('barcode', $request->code)->first();
        $qrcodeInvoice = str_contains($request->code, 'faktur-');
        if ($qrcodeInvoice) {
            $invoice->update(['printing' => true]);
        } else {
            if (ctype_digit($request->code)) {
                if ($product) {
                    $invoice = Transaction::where('qrcode', Inertia::getShared('codeScan'))->first();
                    TransactionLog::create([
                        'transaction_id' => $invoice->id,
                        'invoice_log_type' => Product::class,
                        'invoice_log_id' => $product->id
                    ]);
                } else {
                    Inertia::flash('barcode', $request->code);
                }
            } else {
                $classname = 'bg-red-500';
                $icon = 'x-circle';
                $success = 'QRCode tidak terdaftar, silahkan pindai yang lain!';
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
        $getLatestId = Transaction::latest()->first()?->id + 1 ?? 1;
        $hashId = Str::uuid();
        $makeQRCode = "faktur-{$getLatestId}.{$hashId}";
        $transaction->create([
            'qrcode' => $makeQRCode,
            'incoming' => $mutationMethod,
            'printing' => true
        ]);
        Inertia::share('codeScan', $makeQRCode);
        session()->put('codeScan', $makeQRCode);
    }
}
