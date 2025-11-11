<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedimento extends Model
{
    use HasFactory;

    protected $table = 'procedimentos';

    protected $fillable = [
        'nome',
        'descricao',
        'preco',
        'ativo',
    ];

}

