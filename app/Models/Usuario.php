<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Authenticatable
{
    use HasFactory, hasRoles;

    protected $table = 'usuarios';

    protected $fillable = [
        'nome',
        'password',
    ];

    public function pacientes()
    {
        return $this->hasMany(Paciente::class, 'usuarios_id');
    }
}
