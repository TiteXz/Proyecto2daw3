<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoricoLugaresTable extends Migration
{
    public function up()
    {
        Schema::create('historico_lugares', function (Blueprint $table) {
            $table->string('ubicacion');
            $table->float('temperatura', 3, 2);
            $table->integer('humedad');
            $table->integer('precipitaciones');
            $table->integer('velocidad_viento');
            $table->string('direccion_viento');
            $table->timestamp('fecha_log');

            // Clave foránea
            $table->foreign('ubicacion')->references('ubicacion')->on('lugares')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('historico_lugares');
    }
    
}
