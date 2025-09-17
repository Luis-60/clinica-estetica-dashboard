<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $table = 'pacientes';

    protected $fillable = [
        'nome',
        'data_nasc',
        'endereco',
        'telefone',
        'sexo',
        'rede_social',
        'usuarios_id',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuarios_id');
    }
    public function fichasAnamnese()
    {
        return $this->hasMany(FichaAnamnese::class, 'pacientes_id');
    }
    public function evolucoes()
    {
        return $this->hasMany(Evolucao::class, 'pacientes_id');
    }
    public function consultas()
    {
        return $this->hasMany(Consulta::class, 'pacientes_id');
    }
    public function pacientesCremes()
    {
        return $this->hasMany(PacienteCreme::class, 'pacientes_id');
    }
    public function pacientesAlergias()
    {
        return $this->hasMany(PacienteAlergia::class, 'pacientes_id');
    }
}
