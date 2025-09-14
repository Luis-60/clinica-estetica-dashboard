<?php

namespace App\Services;

use App\Models\Artigo;
use App\Models\ArtigoAutor;
use App\Models\Usuario;
use App\Models\Avaliacao;
use App\Models\Tipo;
use App\Models\Curso;

class CursoService
{
    function listCursosArticle(){
        $artigos = Artigo::get();

        foreach ($artigos as $artigo){
            $artigo->cursos = Curso::whereHas('artigosAutores', function($q) use ($artigo) {
                $q->where('artigos_id', $artigo->id);
            })->get();
        }  
        return $artigos;
    }
    
}