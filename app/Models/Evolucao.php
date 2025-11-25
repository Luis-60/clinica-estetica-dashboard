<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evolucao extends Model
{
    use HasFactory;
    protected $table = 'evolucoes';
    protected $fillable = [
        'data',
        'procedimentos_id',
        'observacoes',
        'pacientes_id',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacientes_id');
    }
    public function procedimento()
    {
        return $this->belongsTo(Procedimento::class, 'procedimentos_id');
    }
}
