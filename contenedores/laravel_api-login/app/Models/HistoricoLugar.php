<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricoLugar extends Model
{
    use HasFactory;

    protected $fillable = [
        'ubicacion',
        'temperatura',
        'viento',
        'humedad',
        'precipitacion',
        'lluvia',
    ];
}
