<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardingHouse extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function properties()
    {
        return $this->belongsTo(Property::class, 'property_id');
    }

    public function customers()
    {
        return $this->hasMany(Customer::class, 'customer_id');
    }
}
