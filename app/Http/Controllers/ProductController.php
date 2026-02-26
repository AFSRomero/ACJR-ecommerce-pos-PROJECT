<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
{
    return response()->json(
    Product::with(['ingredients' => function ($query) {
        $query->select('ingredients.id', 'name', 'stock_quantity', 'version');
    }])->get()
);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required',
        'price' => 'required|numeric',
        'stock_quantity' => 'required|integer',
        'sku' => 'required|unique:products'
    ]);

    $product = Product::create($validated);

    return response()->json($product, 201);
}

public function show(Product $product)
{
    return response()->json($product);
}

public function update(Request $request, Product $product)
{
    $product->update($request->all());

    return response()->json($product);
}

public function destroy(Product $product)
{
    $product->delete();

    return response()->json(['message' => 'Deleted']);
}
}
