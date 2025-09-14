<?php

namespace App\Services;

use App\Models\Artigo;
use App\Models\Usuario;
use App\Models\Avaliacao;
use App\Models\Tipo;
use App\Models\Curso;
use Illuminate\Database\Eloquent\Collection;

class ArtigoService
{
    // Listar Artigos do SEAC
    function listArticlesSEAC(){
        return Artigo::with(
        
            [
                'autores.instituicao:id,nome,sigla_instituicao',
                'area:id,sigla,nome',
                'evento:id,nome',
                'status:id,nome',
            ]
        )->
        where('tipo', 'seac')->get();
    }


    // Listar Artigos do SEGET
    function listArticlesSEGET(){
        return Artigo::with(
        
            [
                'autores.instituicao:id,nome,sigla_instituicao',
                'area:id,sigla,nome',
                'evento:id,nome',
                'status:id,nome',
            ]
        )->
        where('tipo', 'seget')->get();
    }
    
    function listCursosAutores($artigos){
        foreach ($artigos as $artigo){

            $cursosAutores = $artigo->autores
            ->map(function($usuario) {
                return isset($usuario->pivot) && isset($usuario->pivot)
                ? $usuario->pivot['cursos_id']
                : null;
            })
            ->filter()
            ->unique()
            ->values();
            $cursosAutoresNome = Curso::whereIn('id', $cursosAutores)->pluck('nome');

            $artigo->cursos_autores = $cursosAutoresNome;
        }
        return $artigos;
    }

    // TO DO: Vai ter que listar os artigos do SEAC e de acordo com o curso
    function listEvalSEAC($artigos){
        
    }

    // TO DO: Vai ter que listar os artigos do SEGET e de acordo com a área
    function listEvalSEGET($artigos){

    }

    // Listar Instituições dos Autores
    function listInstitAut(Collection $artigos){
        foreach ($artigos as $artigo){
            $instituicoesAutores = $artigo->autores
                ->map(function($autor) {
                    return isset($autor->instituicao) ? $autor->instituicao['sigla_instituicao'] : null;
                })
                ->filter()
                ->unique()
                ->values();
                $artigo->instituicoes_autores = $instituicoesAutores;
        }
        return $artigos;
    }

    public function designaArtigosCOORD(int $curso)
    {
        $artigos = $this->listArticlesSEAC();

        $artigos = $artigos->filter(function($artigo) use ($curso) {
            return $artigo->autores->contains(function($autor) use ($curso) {
                return isset($autor->pivot) && $autor->pivot->cursos_id === $curso;
            });
        })->values();

        $tipoAvaliadorSeacId = Tipo::where('nome', 'Avaliador Seac')->value('id');

        $avaliadores = Usuario::whereHas('tiposUsuario', function($q) use ($tipoAvaliadorSeacId) {
            $q->whereIn('tipos_id', [$tipoAvaliadorSeacId]);
        })->with(['instituicao', 'tiposUsuario'])->get();
        
        $artigos = $this->listInstitAut($artigos);
        $artigos = $this->listCursosAutores($artigos);


        foreach ($artigos as $artigo) {

            // Avaliadores já atribuídos
            $avaliadoresArtigo = Avaliacao::where('artigos_id', $artigo->id)
                ->with([
                    'usuario:id,nome,email,telefone,instituicoes_id',
                    'usuario.instituicao:id,nome,sigla_instituicao',
                    'usuario.curso_periodo.curso:id,nome'
                ])
                ->get()
                ->values();
            $artigo->avaliadores = $avaliadoresArtigo;

            // Cursos dos avaliadores disponíveis
            if ($artigo->tipo === 'seac') {
                $avaliadoresDisponiveis = $avaliadores->filter(function($usuario) use ($tipoAvaliadorSeacId) {
                    return $usuario->tiposUsuario->contains('tipos_id', $tipoAvaliadorSeacId);
                })->map(function($usuario) {
                    $usuario->nomeInstituicao = $usuario->nome;
                    if (isset($usuario->instituicao) && isset($usuario->instituicao['sigla_instituicao'])) {
                        $usuario->nomeInstituicao .= ' - ' . $usuario->instituicao['sigla_instituicao'];
                    }
                    return $usuario;
                })->values();
            } else {
                $avaliadoresDisponiveis = collect();
            }

            $cursosAvaliadores = $avaliadoresDisponiveis
                ->map(function($avaliador) {
                    return isset($avaliador->curso_periodo) && isset($avaliador->curso_periodo->curso)
                        ? $avaliador->curso_periodo->curso['nome']
                        : null;
                })
                ->filter()
                ->unique()
                ->values();

            $artigo->cursos_avaliadores = $cursosAvaliadores;
            $artigo->avaliadoresDisponiveis = $avaliadoresDisponiveis;
        }

        // coleta finais
        $instituicoes = $artigos->pluck('instituicoes_autores')->flatten()->unique()->values();
        $autores = $artigos->pluck('autores')->flatten()->unique('id')->values();
        $cursos = $artigos->pluck('cursos_autores')->flatten()->unique()->values();

        return [
            'artigos' => $artigos,
            'instituicoes' => $instituicoes,
            'autores' => $autores,
        ];
    }

    
    public function designaArtigosADM()
    {
        $artigos = $this->listArticlesSEGET()->merge($this->listArticlesSEAC());
        // Busca os ids dos tipos de avaliador
        $tipoAvaliadorSegetId = Tipo::where('nome', 'Avaliador Seget')->value('id');
        $tipoAvaliadorSeacId = Tipo::where('nome', 'Avaliador Seac')->value('id');
        // Busca todos os avaliadores dos dois tipos, incluindo tiposUsuario
        $avaliadores = Usuario::whereHas('tiposUsuario', function($q) use ($tipoAvaliadorSegetId, $tipoAvaliadorSeacId) {
            $q->whereIn('tipos_id', [$tipoAvaliadorSegetId, $tipoAvaliadorSeacId]);
        })->with(['instituicao', 'tiposUsuario'])->get();
    
        $artigos = $this->listInstitAut($artigos);
        $artigos = $this->listCursosAutores($artigos);
        foreach ($artigos as $artigo) {
                    
                $avaliadoresArtigo = Avaliacao::where('artigos_id', $artigo->id)
                    ->with([
                        'usuario:id,nome,email,telefone,instituicoes_id',
                        'usuario.instituicao:id,nome,sigla_instituicao',
                        'usuario.curso_periodo.curso:id,nome'
                    ])
                    ->get()
                    ->values();
                $artigo->avaliadores = $avaliadoresArtigo;
                    
                // Cursos dos avaliadores disponíveis
                if ($artigo->tipo === 'seac') {
                $avaliadoresDisponiveis = $avaliadores->filter(function($usuario) use ($tipoAvaliadorSeacId) {
                    return $usuario->tiposUsuario->contains('tipos_id', $tipoAvaliadorSeacId);
                })->map(function($usuario) {
                    $usuario->nomeInstituicao = $usuario->nome;
                    if (isset($usuario->instituicao) && isset($usuario->instituicao['sigla_instituicao'])) {
                        $usuario->nomeInstituicao .= ' - ' . $usuario->instituicao['sigla_instituicao'];
                    }
                    return $usuario;
                })->values();
            } elseif ($artigo->tipo === 'seget') {
                $avaliadoresDisponiveis = $avaliadores->filter(function($usuario) use ($tipoAvaliadorSegetId) {
                    return $usuario->tiposUsuario->contains('tipos_id', $tipoAvaliadorSegetId);
                })->map(function($usuario) {
                    $usuario->nomeInstituicao = $usuario->nome;
                    if (isset($usuario->instituicao) && isset($usuario->instituicao['sigla_instituicao'])) {
                        $usuario->nomeInstituicao .= ' - ' . $usuario->instituicao['sigla_instituicao'];
                    }
                    return $usuario;
                })->values();
            } else {
                $avaliadoresDisponiveis = collect();
            }
            $cursosAvaliadores = collect($artigo->avaliadoresDisponiveis)
                ->map(function($avaliador) {
                    return isset($avaliador->curso_periodo) && isset($avaliador->curso_periodo->curso)
                        ? $avaliador->curso_periodo->curso['nome']
                        : null;
                })
                ->filter()
                ->unique()
                ->values();
            $artigo->cursos_avaliadores = $cursosAvaliadores;
            $artigo->avaliadoresDisponiveis = $avaliadoresDisponiveis;
        }
        // Garante que instituiçoes e autores não fiquem indefinidos
        $instituicoes = $artigos->pluck('instituicoes_autores')->flatten()->unique()->values();
        $autores = $artigos->pluck('autores')->flatten()->unique('id')->values();
        $cursos = $artigos->pluck('cursos_autores')->flatten()->unique()->values();

        return [
            'artigos' => $artigos,
            'instituicoes' => $instituicoes,
            'autores' => $autores,
        ];

    }
}