<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('ingredients', function (Blueprint $table) {
        $table->decimal('low_stock_threshold', 10, 2)->default(100);
    });
}

public function down()
{
    Schema::table('ingredients', function (Blueprint $table) {
        $table->dropColumn('low_stock_threshold');
    });
}
};
