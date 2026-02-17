<?php

namespace App\Models;

use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function ingredients()
{
    return $this->belongsToMany(Ingredient::class)
                ->withPivot('quantity_required')
                ->withTimestamps();
}
    protected $fillable = [
    'name',
    'description',
    'price',
    'stock_quantity',
    'sku'
];
}
