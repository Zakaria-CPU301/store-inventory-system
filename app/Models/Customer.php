<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['cust_name', 'telp'];

    public function moneyDebts()
    {
        return $this->hasMany(MoneyDebt::class);
    }

    public function boardings()
    {
        return $this->hasMany(BoardingHouse::class);
    }

    public function numberCustomers() {
        return $this->hasMany(NumberCustomer::class);
    }
}
