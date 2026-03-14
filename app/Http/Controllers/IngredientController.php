<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index()
    {
        return response()->json(Ingredient::whereNull('deleted_at')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stock_quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'low_stock_threshold' => 'required|numeric|min:0'
        ]);

        $ingredient = Ingredient::create($validated);

        return response()->json($ingredient, 201);
    }

    public function show(Ingredient $ingredient)
    {
        return response()->json($ingredient);
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'stock_quantity' => 'sometimes|numeric|min:0',
            'unit' => 'sometimes|string|max:50',
            'low_stock_threshold' => 'sometimes|numeric|min:0'
        ]);

        $ingredient->update($validated);

        return response()->json($ingredient);
    }

   public function destroy(Ingredient $ingredient)
{
    $ingredient->delete(); // this now archives

    return response()->json([
        'message' => 'Ingredient archived successfully'
    ]);
}
public function archived()
{
    return response()->json(
        Ingredient::onlyTrashed()->get()
    );
}

public function restore($id)
{
    Ingredient::onlyTrashed()
        ->where('id', $id)
        ->restore();

    return response()->json(['message' => 'Restored']);
}
}