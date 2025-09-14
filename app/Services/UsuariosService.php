<?php

namespace App\Services;

use App\Models\Instituicao;
use App\Models\TipoUsuario;
use App\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosService
{
    public function listarUsuarios()
    {
        return Usuario::all(['id', 'nome', 'email']);
    }

    public function listarUsuariosSeac()
    {
        return Usuario::where('aluno_AEDB', true)->get(['id', 'nome', 'email']);
    }

    public function criarUsuario(array $usuario_data, int $tipoId = 5): Usuario
    {
        // Busca ou cria a combinação de curso e período

        // Define aluno_AEDB se for 'Tipo' Autor e email incluir aedb.br
        $aluno_AEDB = ($tipoId == 5 && str_ends_with($usuario_data['email'], 'aedb.br')) ? 1 : 0;

        // Cria o usuário
        $user = Usuario::create([
            'nome' => $usuario_data['nome'],
            'email' => $usuario_data['email'],
            'senhaHash' => Hash::make($usuario_data['senhaHash']),
            'instituicoes_id' => $usuario_data['instituicoes_id'] ?? null,
            'cursos_id' => $usuario_data['cursos_id'] ?? null,
            'periodos_id' => $usuario_data['periodos_id'] ?? null,
            'endereco' => $usuario_data['endereco'] ?? null,
            'cep' => $usuario_data['cep'] ?? null,
            'bairro' => $usuario_data['bairro'] ?? null,
            'cidade' => $usuario_data['cidade'] ?? null,
            'estado' => $usuario_data['estado'] ?? null,
            'telefone' => $usuario_data['telefone'] ?? null,
            'aluno_AEDB' => $usuario_data['aluno_AEDB'] ?? $aluno_AEDB,
        ]);

        // Cria o tipo de usuário (ex: professor = 3, aluno = 5, etc.)
        TipoUsuario::create([
            'usuarios_id' => $user->id,
            'tipos_id' => $tipoId,
        ]);

        DB::table('model_has_roles')->insert([
            [
                'role_id' => $tipoId,
                'model_type' => 'App\\Models\\Usuario',
                'model_id' => $user->id,
            ]
        ]);
    

        $user->save();

        return $user;
    }

    public function criarUsuarioOrientador(array $usuario_data): Usuario
    {
        $instituicao_id = Instituicao::where('sigla_instituicao', "AEDB")->value('id');

        if (!$instituicao_id) {
            throw new Exception("Falha ao encontrar instituição AEDB, tente novamente mais tarde ou consulte um Adminstrador!");
        }

        $usuario_data["senhaHash"] = $usuario_data["email"];
        $usuario_data["instituicoes_id"] = $instituicao_id;
        $usuario_data["aluno_AEDB"] = 1;

        $user = $this->criarUsuario($usuario_data, 2);

        return $user;
    }

    public function criarUsuarioCoordenador(array $usuario_data): Usuario
    {
        $instituicao_id = Instituicao::where('sigla_instituicao', "AEDB")->value('id');

        if (!$instituicao_id) {
            throw new Exception("Falha ao encontrar instituição AEDB, tente novamente mais tarde ou consulte um Adminstrador!");
        }

        $usuario_data["senhaHash"] = $usuario_data["email"];
        $usuario_data["instituicoes_id"] = $instituicao_id;
        $usuario_data["aluno_AEDB"] = 1;

        $user = $this->criarUsuario($usuario_data, 6);
         
        return $user;
    }
}
