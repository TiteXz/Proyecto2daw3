<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricoLugar extends Model
{
    use HasFactory;
    protected $table = 'historico_lugares'; 
    public $timestamps = false;

    protected $fillable = [
        'ubicacion',
        'temperatura',
        'viento',
        'humedad',
        'precipitacion',
        'lluvia',
    ];
}
