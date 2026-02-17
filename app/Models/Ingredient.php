<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;   // ← MUST be first inside class

    protected $fillable = [
        'name',
        'stock_quantity',
        'unit',
        'low_stock_threshold',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)
                    ->withPivot('quantity_required')
                    ->withTimestamps();
    }
}
