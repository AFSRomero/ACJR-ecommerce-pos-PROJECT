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
    public function index()
{
    return Order::with('items')
        ->latest()
        ->get();
}
    public function store(Request $request)
    {
        $startTime = microtime(true);

        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.ingredients' => 'required|array',
            'source' => 'required|string|in:pos,ecommerce'
        ]);

        return DB::transaction(function () use ($validated, $startTime) {

            $total = 0;

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $total += $product->price * $item['quantity'];
            }

            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'total_amount' => $total,
                'status' => 'completed',
                'source' => $validated['source'],
            ]);

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

                    $clientVersion = collect($item['ingredients'])
                        ->firstWhere('id', $ingredient->id)['version'] ?? null;

                    // 🔐 Optimistic Lock Check
                    if ($clientVersion != $ingredient->version) {
                        throw new HttpResponseException(response()->json([
                            'status' => 'reject_concurrency',
                            'message' => 'Inventory version mismatch',
                            'ingredient_id' => $ingredient->id,
                        ], 409));
                    }

                    // 🛑 Inventory Sufficiency Check
                    if ($ingredient->stock_quantity < $requiredQuantity) {
                        throw new HttpResponseException(response()->json([
                            'status' => 'reject_inventory',
                            'message' => 'Insufficient stock',
                            'ingredient_id' => $ingredient->id,
                            'required' => $requiredQuantity,
                            'available' => $ingredient->stock_quantity,
                        ], 409));
                    }

                    // 🔻 Deduct + Increment Version
                    $ingredient->decrement('stock_quantity', $requiredQuantity);
                    $ingredient->increment('version');

                    $ingredient->refresh();

                    if (
                        isset($ingredient->low_stock_threshold) &&
                        $ingredient->stock_quantity <= $ingredient->low_stock_threshold
                    ) {
                        event(new LowStockDetected($ingredient));
                    }
                }
            }

            event(new OrderCreated($order->load('items')));

            $executionTime = round(microtime(true) - $startTime, 5);

            return response()->json([
                'status' => 'commit',
                'execution_time_seconds' => $executionTime,
                'order' => $order->load('items')
            ]);
        });
    }
    
}