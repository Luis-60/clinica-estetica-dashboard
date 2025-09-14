<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

// Importa as anotações do OpenAPI (Swagger)
use OpenApi\Annotations as OA;

class UsuariosController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/usuarios",
     *     summary="Lista todos os usuários",
     *     tags={"Usuários"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de usuários retornada com sucesso"
     *     )
     * )
     */
    public function index()
    {
        return response()->json(User::all());
    }
}