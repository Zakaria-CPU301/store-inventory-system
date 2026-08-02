<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['customer_name'];

    public function debt()
    {
        return $this->hasMany(Debt::class);
    }

    public function boarding()
    {
        return $this->hasMany(BoardingHouse::class);
    }

    public function balance()
    {
        return $this->hasMany(BalanceNumber::class);
    }
}
