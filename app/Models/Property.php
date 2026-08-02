<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $guarded = ['property_name'];

    public function boarding() {
        return $this->hasMany(BoardingHouse::class);
    }
}
