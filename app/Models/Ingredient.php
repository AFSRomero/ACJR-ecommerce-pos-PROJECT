<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
    'stock_quantity',
    'unit',
    'low_stock_threshold',
    'version'
    ];

    protected $attributes = [
        'version' => 1
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)
            ->withPivot('quantity_required')
            ->withTimestamps();
    }
}