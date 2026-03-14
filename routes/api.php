<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $request) => $request->user());

    /*
    |--------------------------------------------------------------------------
    | PRODUCTS & CATEGORIES (VIEWABLE BY ALL AUTH USERS)
    |--------------------------------------------------------------------------
    */
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::get('/categories', [CategoryController::class, 'index']);

    /*
    |--------------------------------------------------------------------------
    | INVENTORY VIEW (ADMIN + CASHIER)
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,cashier')->group(function () {
        Route::get('/ingredients', [IngredientController::class, 'index']);
    });

    /*
    |--------------------------------------------------------------------------
    | ADMIN ONLY
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin')->group(function () {

        // Categories Management
        Route::post('/categories', [CategoryController::class, 'store']);

        // Ingredient Management
        Route::get('/ingredients/archived', [IngredientController::class, 'archived']);
        Route::post('/ingredients/{id}/restore', [IngredientController::class, 'restore']);
        Route::post('/ingredients', [IngredientController::class, 'store']);
        Route::put('/ingredients/{ingredient}', [IngredientController::class, 'update']);
        Route::delete('/ingredients/{ingredient}', [IngredientController::class, 'destroy']);

        // Product Management
        // Note: Archived routes must come BEFORE resource or ID routes
        Route::get('/products/archived', [ProductController::class, 'archived']);
        Route::post('/products/{id}/restore', [ProductController::class, 'restore']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // Orders view
        Route::get('/orders', [OrderController::class, 'index']);
    });

    /*
    |--------------------------------------------------------------------------
    | ORDER CREATION (ADMIN + CASHIER + CUSTOMER)
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin,cashier,customer')->group(function () {
        Route::post('/orders', [OrderController::class, 'store']);
    });

});