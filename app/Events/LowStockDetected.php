<?php

namespace App\Events;

use App\Models\Ingredient;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class LowStockDetected implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $ingredient;

    public function __construct(Ingredient $ingredient)
    {
        $this->ingredient = $ingredient;
    }

    public function broadcastOn()
    {
        return new Channel('inventory');
    }

    public function broadcastAs()
    {
        return 'inventory.low_stock';
    }

    public function broadcastWith()
    {
        return [
            'ingredient_id' => $this->ingredient->id,
            'ingredient_name' => $this->ingredient->name,
            'remaining_stock' => $this->ingredient->stock_quantity,
            'threshold' => $this->ingredient->low_stock_threshold,
        ];
    }
}