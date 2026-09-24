<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function transactions() {
        $this->morphMany(Transaction::class, 'invoice_log');
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function unitProducts() {
        return $this->hasMany(UnitProduct::class);
    }
}
