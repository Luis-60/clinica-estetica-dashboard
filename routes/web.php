<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        
        return Inertia::render('menu', [
        ]);
    })->name('dashboard');
});

require __DIR__ . '/auth.php';
