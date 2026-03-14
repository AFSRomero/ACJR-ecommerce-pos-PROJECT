<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        // Added 'category' to the with() so we get the category name
        return response()->json(
            Product::whereNull('deleted_at')
                ->with(['ingredients', 'category']) 
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'sku' => 'required|unique:products',
            'category_id' => 'required|exists:categories,id', // Added category validation
            'ingredients' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $ingredients = is_string($request->ingredients)
            ? json_decode($request->ingredients, true)
            : $request->ingredients;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product = Product::create($validated);

        if (!empty($ingredients)) {
            foreach ($ingredients as $ingredient) {
                $product->ingredients()->attach($ingredient['id'], [
                    'quantity_required' => $ingredient['quantity_required']
                ]);
            }
        }

        return response()->json($product->load(['ingredients', 'category']), 201);
    }

    public function show(Product $product)
    {
        return response()->json($product->load(['ingredients', 'category']));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'sku' => 'required|unique:products,sku,' . $product->id,
            'category_id' => 'required|exists:categories,id', // Added category validation
            'ingredients' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $ingredients = is_string($request->ingredients)
            ? json_decode($request->ingredients, true)
            : $request->ingredients;

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product->update($validated);

        // Sync ingredients logic (Kept exactly as you wrote it)
        $syncData = [];
        foreach ($ingredients as $ingredient) {
            $syncData[$ingredient['id']] = [
                'quantity_required' => $ingredient['quantity_required']
            ];
        }
        $product->ingredients()->sync($syncData);

        return response()->json($product->load(['ingredients', 'category']));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Archived']);
    }

    public function archived()
    {
        return response()->json(
            Product::onlyTrashed()
                ->with(['ingredients', 'category'])
                ->get()
        );
    }

    public function restore($id)
    {
        Product::onlyTrashed()
            ->where('id', $id)
            ->restore();

        return response()->json(['message' => 'Restored']);
    }
}