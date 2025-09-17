<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    public function run()
    {

        Usuario::create([
            'nome' => 'admin',
            'password' => Hash::make('senha123'),
        ]);

        Usuario::create([
            'nome' => 'Maria',
            'password' => Hash::make('senha123'),
        ]);

        Usuario::create([
            'nome' => 'João',
            'password' => Hash::make('senha123'),
        ]);
    }
}
