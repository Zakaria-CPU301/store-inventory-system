<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function customers() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    // public function 
}
