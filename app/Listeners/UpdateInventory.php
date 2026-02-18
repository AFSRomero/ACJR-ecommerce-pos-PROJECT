<?php

namespace App\Listeners;

use App\Events\OrderCreated;

class UpdateInventory
{
    public function handle(OrderCreated $event)
    {
        // 🔥 Inventory is already handled inside OrderController transaction.
        // This listener is now reserved for logging or analytics only.
    }
}