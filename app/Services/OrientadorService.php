<?php

namespace App\Services;

use App\Models\Usuario;
use App\Models\TipoUsuario;

class OrientadorService
{
    public function listarOrientadores()
    {
        return Usuario::whereHas('tipos', function ($query) {
            $query->where('tipos_id', TipoUsuario::ORIENTADOR);
        })->get(['id', 'nome']);
    }
}