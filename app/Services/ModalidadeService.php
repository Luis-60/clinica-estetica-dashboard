<?php

namespace App\Services;

use App\Models\Modalidade;

class ModalidadeService
{
    public function listarModalidade()
    {
        // Retorna todas as modalidades
        return Modalidade::all(['id', 'nome']);
    }
}