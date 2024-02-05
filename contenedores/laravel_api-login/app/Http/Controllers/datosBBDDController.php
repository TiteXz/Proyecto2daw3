<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lugar; 
use GuzzleHttp\Client;
use App\Models\HistoricoLugar;
use Carbon\Carbon;


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

    public function datosDelAnoPasado()
    {
        $startDate = Carbon::now()->subYear();
        $endDate = Carbon::now();

        $historicoLugares = HistoricoLugar::whereBetween('fecha_log', [$startDate, $endDate])->get();

        return response()->json($historicoLugares);
    }

    public function datosDelMesPasado()
    {
        $startDate = Carbon::now()->subMonth();
        $endDate = Carbon::now();

        $historicoLugares = HistoricoLugar::whereBetween('fecha_log', [$startDate, $endDate])->get();

        return response()->json($historicoLugares);
    }

    public function datosDeAyer()
    {
        $yesterday = Carbon::yesterday();

        $historicoLugares = HistoricoLugar::whereDate('fecha_log', $yesterday)->get();

        return response()->json($historicoLugares);
    }

    public function datosDeHoy()
    {
        $today = Carbon::today();

        $historicoLugares = HistoricoLugar::whereDate('fecha_log', $today)->get();

        return response()->json($historicoLugares);
    }
}
