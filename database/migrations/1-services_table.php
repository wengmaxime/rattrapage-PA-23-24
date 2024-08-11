<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        DB::table('services')->insert([
            ['id' => 1, 'name' => 'Routier', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Cuisinier', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Prof', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
