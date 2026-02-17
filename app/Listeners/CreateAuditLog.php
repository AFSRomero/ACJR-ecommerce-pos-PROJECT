<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use Illuminate\Support\Facades\Log;

class CreateAuditLog
{
    public function handle(OrderCreated $event)
    {
        $order = $event->order;

        Log::info("Order Created", [
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'total' => $order->total_amount
        ]);
    }
}