<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichaAnamnese extends Model
{
    use HasFactory;
    protected $table = 'fichas_anamnese';
    protected $fillable = [
        'lente_contato',
        'epilepsia_convulsoes',
        'funciona_instest_reg',
        'trat_facial_anterior',
        'agua_freq',
        'bebida_alcool',
        'filtro_solar',
        'periodo_menstrual',
        'boa_qual_sono',
        'protese_corpo_fac',
        'tabagismo',
        'alteracoes_cardiacas',
        'portador_marcapasso',
        'gestante',
        'problema_pele',
        'tratamento_medico',
        'tumor_lesao_cancer',
        'boa_alimentacao',
        'horas_por_noite',
        'qual_anticoncepcional',
        'tempo_gestante',
        'motivo_estetico',
        'pacientes_id',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'pacientes_id');
    }
}
