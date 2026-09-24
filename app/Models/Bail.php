<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bail extends Model
{
    protected $fillable = ['bail_name', 'bail_photo'];

    public function transactionLogs() {
        return $this->belongsTo(TransactionLog::class, 'transaction_log_id');
    }
}
