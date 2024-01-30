<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistoricoLugar;
use Illuminate\Support\Facades\Http;

class DatosbbddController extends Controller
{
    public function datosHistoricos()
    {
        $lugares = [
            '48' => '48020',
            '20' => '20069',
            '20' => '20067',
            '20' => '20036',
            '20' => '20045',
        ];


        try {
            foreach ($lugares as $cod_provincia => $cod_ciudad) {
                $url = "https://www.el-tiempo.net/api/json/v2/provincias/{$cod_provincia}/municipios/{$cod_ciudad}";
                $response = Http::get($url);
                echo 'hola1';
                if ($response->getStatusCode() == 200) {
                    $data = json_decode($response->getBody(), true);
                    echo 'hola2';
                    // Procesamiento de la ubicación
                    $ubicacion = strtolower(str_replace(['/', ' '], '', $data["breadcrumb"][3]["name"]));
                    echo strtolower(str_replace(['/', ' '], '', $data["breadcrumb"][3]["name"]));
                    // Verificar si la ubicación contiene "san sebastian" y asignar "donostia" en ese caso
                    if (strpos($ubicacion, 'sansebastian') !== false) {
                        $ubicacion = 'donostia';
                    }

                    // Almacenar en la base de datos
                    HistoricoLugar::create([
                        'ubicacion' => $ubicacion,
                        'temperatura' => $data["temperatura_actual"],
                        'velocidad_viento' => $data["viento"],
                        'humedad' => $data["humedad"],
                        'precipitacion' => $data["precipitacion"],
                        'temperatura_max' => $data["temperaturas"]['max'],
                        'temperatura_min' => $data["temperaturas"]['min'],
                    ]);
                    echo 'hola3';
                } else {
                    throw new \Exception("La solicitud para la provincia $cod_provincia y ciudad $cod_ciudad no se pudo completar correctamente.");
                    echo 'hola4';
                }
            }

            return response()->json(['message' => 'Datos de todos los lugares almacenados correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
