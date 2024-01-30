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

                
                


                echo 'hola1';

                $url = "https://www.el-tiempo.net/api/json/v2/provincias/{$cod_provincia}/municipios/{$cod_ciudad}";
                $response = Http::get($url);

                //Log::info("Iteración $i - Respuesta de la API: " . json_encode($response->json()));
               // Log::info("Iteración $i - Procesando ciudad: $cod_ciudad, Provincia: $cod_provincia");
              //  Log::info("Iteración $i - URL: $url");

                echo 'hola2';

                if ($response->getStatusCode() == 200) {
                    $data = json_decode($response->getBody(), true);
                    echo 'hola3';

                    
                  

                    if (strpos(strtolower(str_replace(['/', ' '], '', $data["breadcrumb"][3]["name"])), 'sansebastian') !== false) {
                        $data["breadcrumb"][3]["name"] = 'donostia';
                    }

                    // Agrupamos los valores en un array asociativo
                    $logData = [
                        'ubicacion' =>$data["breadcrumb"][3]["name"],
                        'temperatura' => $data["temperatura_actual"],
                        'velocidad_viento' => $data["viento"],
                        'humedad' => $data["humedad"],
                        'precipitaciones' => $data["precipitacion"] ?? 0,
                        'temperatura_max' => $data["temperaturas"]['max'],
                        'temperatura_min' => $data["temperaturas"]['min'],
                        'fecha_log' => now(),
                    ];

                    try {
                        HistoricoLugar::create($logData);
                    } catch (\Exception $e) {
                        Log::error("Error al almacenar en la base de datos: " . $e->getMessage());
                    }
                    

                    echo 'hola4';
                } else {
                    throw new \Exception("La solicitud para la provincia $cod_provincia y ciudad $cod_ciudad no se pudo completar correctamente.");
                    echo 'hola5';
                }
            }
            echo 'hola6';

            return response()->json(['message' => 'Datos de todos los lugares almacenados correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}