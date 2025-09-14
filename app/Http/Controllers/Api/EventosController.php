<?php

namespace App\Http\Controllers\Api;

use App\Models\Evento;  
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventosController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eventos = Evento::orderByRaw('
            CASE 
                WHEN evento_finalizado = 0 AND data_inicio <= NOW() THEN 1
                WHEN evento_finalizado = 0 AND data_inicio > NOW() THEN 2
                WHEN evento_finalizado = 1 THEN 3
            END
        ')
        ->orderBy('data_inicio', 'desc')
        ->get();

        return Inertia::render('eventos/index', [
            'eventos' => $eventos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Autores/Create');
    }

    // Other methods like store, show, edit, update, destroy can be added here
}