<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\EvolucaoController;
use App\Http\Controllers\FichaAnamneseController;
use App\Http\Controllers\ConsultaController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('menu', [
        ]);
    })->name('dashboard');

    Route::controller(PacienteController::class)->group(function () {
        Route::get('/pacientes', 'index')->name('pacientes.index');
        Route::post('/pacientes', 'store')->name('pacientes.store');
        Route::put('/pacientes', 'update')->name('pacientes.update');
        Route::delete('/pacientes/{id}', 'destroy')->name('pacientes.destroy');
        Route::get('paciente/{id}', 'show')->name('paciente.show');
    });
    Route::controller(EvolucaoController::class)->group(function () {
        Route::post('/evolucoes', 'store')->name('evolucoes.store');
        Route::put('/evolucoes/{id}', 'update')->name('evolucoes.update');
        Route::delete('/evolucoes/{id}', 'destroy')->name('evolucoes.destroy');
    });

    Route::controller(ConsultaController::class)->group(function () {
        Route::get('/consultas', 'index')->name('consultas.index');
        Route::post('/consultas', 'store')->name('consultas.store');
        Route::put('/consultas/{id}', 'update')->name('consultas.update');
        Route::delete('/consultas/{id}', 'destroy')->name('consultas.destroy');
    });

    Route::controller(FichaAnamneseController::class)->group(function () {
        Route::post('/fichas', 'store')->name('fichas.store');
        Route::put('/fichas/{id}', 'update')->name('fichas.update');
        Route::get('/fichas/{id}', 'show')->name('fichas.show');
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
