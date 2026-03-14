<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required|unique:categories']);
        $category = Category::create([
            'name' => $validated['name'],
            'slug' => \Illuminate\Support\Str::slug($validated['name'])
        ]);
        return response()->json($category, 201);
    }
}