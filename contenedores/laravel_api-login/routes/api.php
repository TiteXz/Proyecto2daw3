<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\datosBBDDController;

/*

|--------------------------------------------------------------------------

| API Routes

|--------------------------------------------------------------------------

|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|

*/

  

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);

Route::middleware('auth:api')->group(function () {  
    Route::get('logout', [RegisterController::class, 'logout']);

});


// Ruta para obtener datos de la tabla "lugares"
Route::get('/lugares', [datosBBDDController::class, 'obtenerLugares']);

// Ruta para obtener datos de la tabla "historico_lugares" 
Route::get('/historico-lugares', [datosBBDDController::class, 'obtenerHistoricoLugares']);

// Ruta para obtener datos de la tabla "historico_lugares" del año pasado
Route::get('/historico-ano-pasado', [datosBBDDController::class, 'datosDelAnoPasado']);

// Ruta para obtener datos de la tabla "historico_lugares" del mes pasado
Route::get('/historico-mes-pasado', [datosBBDDController::class, 'datosDelMesPasado']);

// Ruta para obtener datos de la tabla "historico_lugares" de ayer
Route::get('/historico-ayer', [datosBBDDController::class, 'datosDeAyer']);

// Ruta para obtener datos de la tabla "historico_lugares" de hoy
Route::get('/historico-hoy', [datosBBDDController::class, 'datosDeHoy']);