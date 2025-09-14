<?php

namespace App\Http\Controllers\Api;

use OpenApi\Annotations as OA;

use App\Http\Controllers\Controller;
use App\Models\Artigo;  
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArtigosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *     path="/api/artigos",
     *     summary="Lista todos os artigos",
     *     tags={"Artigos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de artigos retornada com sucesso"
     *     )
     * )
     */
    public function index(): Response
    {
        return Inertia::render('artigos/index', [
            'artigos' => Artigo::all()
        ]);
        
    }
public function show($id)
{
    $artigo = Artigo::with([
        'autores:id,nome,email',
        'orientador:id,nome',
        'curso:id,nome',
        'area:id,nome',
        'modalidade:id,nome',
        'status:id,nome',
        'evento:id,nome'
    ])->findOrFail($id);

    return new ArtigoResource($artigo);
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