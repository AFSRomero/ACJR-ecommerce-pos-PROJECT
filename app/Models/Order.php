<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
    'order_number',
    'total_amount',
    'status',
    'source',
];

public function items()
{
    return $this->hasMany(OrderItem::class);
}
    use HasFactory;
}