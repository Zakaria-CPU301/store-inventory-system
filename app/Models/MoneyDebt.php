<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MoneyDebt extends Model
{
    protected $fillable = ['amount', 'description'];

    public function transactionLogs() {
        return $this->morphMany(TransactionLog::class, 'invoice_log');
    }
}
