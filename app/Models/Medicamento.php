<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicamento extends Model
{
    protected $table = 'medicamentos';

    protected $fillable = [
        'nome',
        'descricao',
        'valor',
        'estoque',
        'imagem',
        'categorias_id',
        'marcas_id',
    ];

    public function marca()
    {
        return $this->belongsTo(MarcaMedicamento::class, 'marcas_id');
    }

    public function categoria()
    {
        return $this->belongsTo(CategoriaMedicamento::class, 'categorias_id');
    }
}
