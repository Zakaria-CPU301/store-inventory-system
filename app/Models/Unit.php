<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = ['unit_name'];

    public function unitProduct() {
        return $this->hasMany(UnitProduct::class);
    }
}
