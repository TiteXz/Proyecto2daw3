<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lugar; // Asegúrate de importar el modelo Lugar
use GuzzleHttp\Client;
use App\Models\HistoricoLugar;

class DatosBBDDController extends Controller
{
    public function obtenerLugares()
    {
        $lugares = Lugar::all();
        return response()->json($lugares);
    }

    public function obtenerHistoricoLugares()
    {
        $cantidadCiudades = 5;
        $historicoLugares = HistoricoLugar::latest('fecha_log')->take($cantidadCiudades)->get();

        return response()->json($historicoLugares);
    }
}
