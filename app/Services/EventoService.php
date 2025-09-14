<?php

namespace App\Services;

use App\Models\Evento;
use App\Models\CicloEvento;
use App\Models\Ciclo;

class EventoService
{
    public function listarEventosSEAC()
    {
        return Evento::where('seac', true)->get();
    }
    
    public function listarEventosSEGET()
    {
        return Evento::where('seget', true)->get();
    }
    public function listarCiclosEventoSeac($eventoId)
    {
        return CicloEvento::where('eventos_id', $eventoId)->where('seac', true)->get();
    }
    public function listarCiclosSeget($eventoId)
    {
        return Ciclo::where('seget', true)->get();
    }
    public function listarCiclosSeac($eventoId)
    {
        return Ciclo::where('seac', true)->get();
    }
    public function listarCiclosEventoSeget($eventoId)
    {
        return CicloEvento::where('eventos_id', $eventoId)->where('seget', true)->get();
    }

}

