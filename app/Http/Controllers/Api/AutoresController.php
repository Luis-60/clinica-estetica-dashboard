<?php

namespace App\Http\Controllers\Api;

use App\Models\Usuario;  
use Illuminate\Http\Request;
use Inertia\Inertia;
    

class AutoresController 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('autores/index', [
            'autores' => Usuario::all()
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