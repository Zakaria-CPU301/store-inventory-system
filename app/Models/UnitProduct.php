<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitProduct extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];
    
    public function units() {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function products() {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
