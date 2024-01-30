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
        Schema::create('historico_lugares', function (Blueprint $table) {
            $table->string('ubicacion', 25);
            $table->integer('temperatura');
            $table->integer('temperatura_max');
            $table->integer('temperatura_min');
            $table->integer('humedad');
            $table->integer('precipitaciones')->default(0);
            $table->integer('velocidad_viento');
            $table->timestamp('fecha_log');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historico_lugares');
    }
};
