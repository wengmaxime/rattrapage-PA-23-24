<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('salle', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            //$table->string('type'); //entrepot, bureau, cuisine
            $table->string('name');
            $table->string('salle');
            $table->string('rue');
            $table->string('code_postale');
            $table->integer('taille'); //m² ? Lxlxh
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salle');
    }
};
