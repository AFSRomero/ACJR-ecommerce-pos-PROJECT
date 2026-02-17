<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class OrderCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;

    public function __construct(Order $order)
    {
        // Load relationships if needed
        $this->order = $order->load('items');
    }

    /**
     * Channel the event will broadcast on
     */
    public function broadcastOn()
    {
        return new Channel('orders');
    }

    /**
     * Custom event name
     */
    public function broadcastAs()
    {
        return 'order.created';
    }

    /**
     * 🔥 Clean Broadcast Payload
     */
    public function broadcastWith()
    {
        return [
            'id' => $this->order->id,
            'order_number' => $this->order->order_number,
            'total_amount' => $this->order->total_amount,
            'status' => $this->order->status,
            'source' => $this->order->source,
            'created_at' => $this->order->created_at,
        ];
    }
}