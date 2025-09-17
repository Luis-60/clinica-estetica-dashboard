<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PacienteCreme extends Model
{
    use HasFactory;
    protected $table = 'pacientes_cremes';
    protected $fillable = [
        'pacientes_id',
        'cremes_ou_locao_id',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacientes_id');
    }
    public function cremeOuLocao()
    {
        return $this->belongsTo(CremeOuLocao::class, 'cremes_ou_locao_id');
    }
}
