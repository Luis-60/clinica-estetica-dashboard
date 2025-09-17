<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CremeOuLocao extends Model
{
    use HasFactory;
    protected $table = 'cremes_ou_locao';
    protected $fillable = [
        'nome',
    ];

    public function pacientesCremes()
    {
        return $this->hasMany(PacienteCreme::class, 'cremes_ou_locao_id');
    }
}
