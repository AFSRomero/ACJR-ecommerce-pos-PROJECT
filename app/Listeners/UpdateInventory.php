<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Models\Product;

class UpdateInventory
{   
    public function handle(OrderCreated $event)
    {
        $order = $event->order;

        foreach ($order->items as $item) {

            $product = Product::with('ingredients')->find($item->product_id);

            foreach ($product->ingredients as $ingredient) {

                $required = $ingredient->pivot->quantity_required * $item->quantity;

                if ($ingredient->stock_quantity < $required) {
                    throw new \Exception("Insufficient stock for {$ingredient->name}");
                }

                $ingredient->decrement('stock_quantity', $required);
            }
        }
    }
}