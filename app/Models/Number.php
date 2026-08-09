<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Number extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function categories()
    {
        return $this->hasMany(Category::class, 'category_id');
    }

    public function numberCustomer() {
        return $this->belongsTo(NumberCustomer::class);
    }
}
