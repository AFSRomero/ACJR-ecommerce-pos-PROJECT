<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Events\OrderCreated;
use App\Events\LowStockDetected;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // 🔥 START PERFORMANCE TIMER
        $startTime = microtime(true);

        // ✅ VALIDATION
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'source' => 'required|string|in:pos,ecommerce'
        ]);

        return DB::transaction(function () use ($validated, $startTime) {

            $total = 0;

            // ✅ CALCULATE TOTAL FIRST
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $total += $product->price * $item['quantity'];
            }

            // ✅ CREATE ORDER
            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'total_amount' => $total,
                'status' => 'completed',
                'source' => $validated['source'],
            ]);

            // ✅ CREATE ORDER ITEMS + DEDUCT INVENTORY
            foreach ($validated['items'] as $item) {

                $product = Product::with('ingredients')
                    ->findOrFail($item['product_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);

                foreach ($product->ingredients as $ingredient) {

                    $requiredQuantity =
                        $ingredient->pivot->quantity_required * $item['quantity'];

                    // ❌ STOCK CHECK
                    if ($ingredient->stock_quantity < $requiredQuantity) {
                        throw new HttpResponseException(response()->json([
                            'message' => 'Insufficient stock',
                            'ingredient' => $ingredient->name,
                            'ingredient_id' => $ingredient->id,
                            'required_quantity' => $requiredQuantity,
                            'available_quantity' => $ingredient->stock_quantity,
                        ], 409));
                    }

                    // 🔻 DEDUCT STOCK
                    $ingredient->decrement('stock_quantity', $requiredQuantity);
                    $ingredient->refresh();

                    // 🔔 LOW STOCK EVENT
                    if (
                        isset($ingredient->low_stock_threshold) &&
                        $ingredient->stock_quantity <= $ingredient->low_stock_threshold
                    ) {
                        event(new LowStockDetected($ingredient));
                    }
                }
            }

            // 🔔 ORDER CREATED EVENT
            event(new OrderCreated($order->load('items')));

            // 🔥 STOP PERFORMANCE TIMER
            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;

            return response()->json([
                'message' => 'Order processed successfully',
                'execution_time_seconds' => round($executionTime, 5),
                'order' => $order->load('items')
            ]);
        });
    }
}
