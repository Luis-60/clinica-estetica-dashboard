<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PacienteController;

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
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
