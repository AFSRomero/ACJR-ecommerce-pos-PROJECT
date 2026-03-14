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
    Schema::table('categories', function (Blueprint $table) {
        // Adding the slug column after the name column
        $table->string('slug')->unique()->after('name');
    });
}

public function down()
{
    Schema::table('categories', function (Blueprint $table) {
        $table->dropColumn('slug');
    });
}
};
