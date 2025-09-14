<?php
use App\Http\Controllers\Api\UsuarioController;

Route::get('/usuarios', [UsuarioController::class, 'index']);

