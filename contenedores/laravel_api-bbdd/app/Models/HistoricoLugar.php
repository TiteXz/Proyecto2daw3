<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricoLugar extends Model
{
    use HasFactory;

    protected $table = 'historico_lugares'; 

    protected $fillable = [
        'ubicacion',
        'temperatura',
        'temperatura_max',
        'temperatura_min',
        'velocidad_viento',
        'humedad',
        'precipitacion',
    ];
}
