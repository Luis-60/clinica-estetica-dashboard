<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PacienteAlergia extends Model
{
    use HasFactory;
    protected $table = 'pacientes_alergias';
    protected $fillable = [
        'pacientes_id',
        'alergias_id',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacientes_id');
    }
    public function alergia()
    {
        return $this->belongsTo(Alergia::class, 'alergias_id');
    }
}
