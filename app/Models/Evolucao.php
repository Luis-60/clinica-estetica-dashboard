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
        'procedimento',
        'observacoes',
        'pacientes_id',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacientes_id');
    }
}
