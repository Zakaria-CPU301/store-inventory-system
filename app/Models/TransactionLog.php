<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionLog extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function invoice_log() {
        return $this->morphTo();
    }
    
    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }

    public function bails()
    {
        return $this->hasMany(Bail::class);
    }
}
