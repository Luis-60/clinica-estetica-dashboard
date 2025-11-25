<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    use HasFactory;

    protected $table = 'consultas';

    protected $fillable = [
        'pacientes_id',
        'procedimentos_id',
        'data',
        'concluido', 
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
