<?php

namespace App\Services;

use App\Models\Area;

class AreasTematicasService
{
    public function listarAreasSeac()
    {
        // Retorna apenas áreas temáticas do SEAC
        return Area::where('seac', true)->get(['id', 'nome']);
    }
}