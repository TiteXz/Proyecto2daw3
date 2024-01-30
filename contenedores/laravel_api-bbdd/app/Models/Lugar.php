<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lugar extends Model
{
    use HasFactory;

    protected $fillable = [
        'ubicacion',
        'latitud',
        'longitud',
        'cod_zona_euskalmet',
        'cod_provincia_el_tiempo',
        'cod_municipio_el_tiempo',
    ];
}
