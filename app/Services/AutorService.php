<?php

namespace App\Services;

use App\Models\Usuario;
use App\Models\TipoUsuario;

class AutorService
{
    public function listarAutores()
    {
        return Usuario::whereHas('tipos', function ($query) {
            $query->where('tipos_id', TipoUsuario::AUTOR);
        })->get(['id', 'nome']);
    }
    public function listarAutoresSeac()
    {
        return Usuario::whereHas('tipos', function ($query) {
            $query->where('tipos_id', TipoUsuario::AUTOR);
        })->where('aluno_AEDB', true)->get(['id', 'nome']);
    }
}
