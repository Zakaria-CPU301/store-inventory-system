<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NumberCustomer extends Model
{
    protected $fillable = ['number_id', 'customer_id'];

    public function number() {
        return $this->belongsTo(Number::class, 'number_id');
    }

    public function customers() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
