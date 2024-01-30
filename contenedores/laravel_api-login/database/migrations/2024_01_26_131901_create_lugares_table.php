<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLugaresTable extends Migration
{
    public function up()
    {
        Schema::create('lugares', function (Blueprint $table) {
            $table->string('ubicacion', 25);
            $table->float('latitud', 10, 6);
            $table->float('longitud', 10, 6);
            $table->string('cod_zona_euskalmet');
            $table->integer('cod_provincia_el_tiempo');
            $table->integer('cod_municipio_el_tiempo');

        });
    }

    public function down()
    {
        Schema::dropIfExists('lugares');
    }
}

