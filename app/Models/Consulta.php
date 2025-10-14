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
        'data',
        'procedimento'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacientes_id');
    }
}
