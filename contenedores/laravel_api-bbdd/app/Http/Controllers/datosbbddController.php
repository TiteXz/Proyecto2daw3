<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistoricoLugar;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DatosbbddController extends Controller
{
    public function datosHistoricos()
    {
        $lugares = [
            '20069' => '20',
            '48020' => '48',
            '20067' => '20',
            '20036' => '20',
            '20045' => '20',
        ];
        $keys = array_keys($lugares);
        $totalCiudades = count($keys);
        try {
            for ($i = 0; $i < $totalCiudades; $i++) {
                $cod_ciudad = $keys[$i];
                $cod_provincia = $lugares[$cod_ciudad];

                $url = "https://www.el-tiempo.net/api/json/v2/provincias/{$cod_provincia}/municipios/{$cod_ciudad}";
                $response = Http::get($url);

                if ($response->getStatusCode() == 200) {
                    $data = json_decode($response->getBody(), true);

                    if (strpos(strtolower(str_replace(['/', ' '], '', $data["breadcrumb"][3]["name"])), 'sansebastian') !== false) {
                        $data["breadcrumb"][3]["name"] = 'donostia';
                    }

                    // Agrupamos los valores en un array asociativo
                    $logData = [
                        'ubicacion' =>$data["breadcrumb"][3]["name"],
                        'temperatura' => $data["temperatura_actual"],
                        'velocidad_viento' => $data["viento"],
                        'humedad' => $data["humedad"],
                        'precipitaciones' => $data['precipitacion'] == 'Ip' ? 0 : $data['precipitacion'],
                        'temperatura_max' => $data["temperaturas"]['max'],
                        'temperatura_min' => $data["temperaturas"]['min'],
                        'fecha_log' => now(),
                    ];

                    try {
                        HistoricoLugar::create($logData);
                    } catch (\Exception $e) {
                        Log::error("Error al almacenar en la base de datos: " . $e->getMessage());
                    }
                    
                } else {
                    throw new \Exception("La solicitud para la provincia $cod_provincia y ciudad $cod_ciudad no se pudo completar correctamente.");
                    echo 'hola5';
                }
            }

            return response()->json(['message' => 'Datos de todos los lugares almacenados correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function alterarDatosLigeramente()
{
    $lugares = [
        '20069' => '20',
        '48020' => '48',
        '20067' => '20',
        '20036' => '20',
        '20045' => '20',
    ];
    $keys = array_keys($lugares);
    $totalCiudades = count($keys);
    try {
        for ($i = 0; $i < $totalCiudades; $i++) {
            $cod_ciudad = $keys[$i];
            $cod_provincia = $lugares[$cod_ciudad];

            $url = "https://www.el-tiempo.net/api/json/v2/provincias/{$cod_provincia}/municipios/{$cod_ciudad}";
            $response = Http::get($url);

            if ($response->getStatusCode() == 200) {
                $data = json_decode($response->getBody(), true);

                if (strpos(strtolower(str_replace(['/', ' '], '', $data["breadcrumb"][3]["name"])), 'sansebastian') !== false) {
                    $data["breadcrumb"][3]["name"] = 'donostia';
                }

                // Agrupamos los valores en un array asociativo
                $logData = [
                    'ubicacion' => $data["breadcrumb"][3]["name"],
                    'temperatura' => $data["temperatura_actual"] + mt_rand(-1, 1), 
                    'velocidad_viento' => $data["viento"]+ mt_rand(-1, 1),
                    'humedad' => $data["humedad"] + mt_rand(-2, 2),
                    'precipitaciones' => $data['precipitacion'] == 'Ip' ? 0 : $data['precipitacion'],
                    'temperatura_max' => $data["temperaturas"]['max']+ mt_rand(-1, 1),
                    'temperatura_min' => $data["temperaturas"]['min']+ mt_rand(-1, 1),
                    'fecha_log' => now(),
                ];

                try {
                    HistoricoLugar::create($logData);
                } catch (\Exception $e) {
                    Log::error("Error al almacenar en la base de datos: " . $e->getMessage());
                }
                
            } else {
                throw new \Exception("La solicitud para la provincia $cod_provincia y ciudad $cod_ciudad no se pudo completar correctamente.");
                echo 'hola5';
            }
        }

        return response()->json(['message' => 'Datos de todos los lugares almacenados correctamente']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

  
}

}