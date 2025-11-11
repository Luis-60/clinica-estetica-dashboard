<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\EvolucaoController;
use App\Http\Controllers\MedicamentoController;
use App\Http\Controllers\FichaAnamneseController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\ProcedimentoController;

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

    Route::controller(MedicamentoController::class)->group(function () {
        Route::get('/medicamentos', 'index')->name('medicamentos.index');
        Route::post('/medicamentos', 'store')->name('medicamentos.store');
        Route::put('/medicamentos', 'update')->name('medicamentos.update');
        Route::delete('/medicamentos/{id}', 'destroy')->name('medicamentos.destroy');
        Route::get('medicamento/{id}', 'show')->name('medicamento.show');
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

    Route::controller(ProcedimentoController::class)->group(function () {
        Route::get('/procedimentos', 'index')->name('procedimentos.index');
        Route::post('/procedimentos', 'store')->name('procedimentos.store');
        Route::put('/procedimentos/{id}', 'update')->name('procedimentos.update');
        Route::delete('/procedimentos/{id}', 'destroy')->name('procedimentos.destroy');
    });

    Route::controller(FichaAnamneseController::class)->group(function () {
        Route::post('/fichas', 'store')->name('fichas.store');
        Route::put('/fichas/{id}', 'update')->name('fichas.update');
        Route::get('/fichas/{id}', 'show')->name('fichas.show');
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
