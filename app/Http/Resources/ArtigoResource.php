<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArtigoResource extends JsonResource
{
    // App/Http/Resources/ArtigoResource.php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'titulo' => $this->titulo,
        'autores' => $this->autores->map(fn($a) => [
            'id' => $a->id,
            'nome' => $a->nome,
            'email' => $a->email
        ]),
        'autores_string' => $this->autores->pluck('nome')->join(', '),
        'area' => $this->area->nome ?? null,
        'area_sigla' => $this->area->sigla ?? null,
        'evento' => $this->evento->nome ?? null,
        'curso' => $this->curso->nome ?? null,
        'modalidade' => $this->modalidade->nome ?? null,
        'status' => $this->status->nome ?? null,
        'orientador' => $this->orientador->nome ?? null,
        'data_envio' => $this->data_envio,
        // ... outros campos se necessário
    ];
}
}