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
        // Obtener la fecha actual
        $today = Carbon::now();
        
        // Obtener el primer día del año anterior
        $startDate = Carbon::now()->subYear()->startOfYear();
        
        // Obtener el último día del año anterior
        $endDate = Carbon::now()->subYear()->endOfYear();
    
        // Consultar los datos dentro del rango de fechas del año anterior
        $historicoLugares = HistoricoLugar::whereBetween('fecha_log', [$startDate, $endDate])->get();
    
        // Retornar los datos en formato JSON
        return response()->json($historicoLugares);
    }

    public function datosDelMesPasado()
    {
        // Obtener la fecha actual
        $today = Carbon::now();
        
        // Obtener el primer día del mes anterior
        $startDate = Carbon::now()->subMonth()->startOfMonth();
        
        // Obtener el último día del mes anterior
        $endDate = Carbon::now()->subMonth()->endOfMonth();
    
        // Consultar los datos dentro del rango de fechas del mes anterior
        $historicoLugares = HistoricoLugar::whereBetween('fecha_log', [$startDate, $endDate])->get();
    
        // Retornar los datos en formato JSON
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
