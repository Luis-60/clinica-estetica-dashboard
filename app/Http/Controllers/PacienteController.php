<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Inertia\Response;


final class PacienteController extends Controller
{
    public function index()
    {
        return inertia('pacientes/index', [
            'pacientes' => Paciente::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string',
            'sexo' => 'required|string|in:masculino,feminino',
            'data_nascimento' => 'required|date',
            'email' => 'required|email',
            'telefone' => 'required|string',
        ]);
        try {
            $paciente = Paciente::create([
                'nome' => $request->nome,
                'sexo' => $request->sexo,
                'data_nascimento' => $request->data_nascimento,
                'email' => $request->email,
                'telefone' => $request->telefone,
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao tentar adicionar Paciente!']);
        }

        return redirect()->back()->with('success', 'Paciente adicionado com sucesso!');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string',
            'sexo' => 'required|string|in:masculino,feminino',
            'data_nascimento' => 'required|date',
            'email' => 'required|email',
            'telefone' => 'required|string',
        ]);
        try {
            $paciente = Paciente::findOrFail($request->id)->update([
                'nome' => $request->nome,
                'sexo' => $request->sexo,
                'data_nascimento' => $request->data_nascimento,
                'email' => $request->email,
                'telefone' => $request->telefone,
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao tentar alterar Paciente!']);
        }

        return redirect()->back()->with('success', 'Paciente alterado com sucesso!');
    }

    public function destroy($id): RedirectResponse
    {
        $deleted = Paciente::where('id', $id)->delete();
        if ($deleted) {
            return redirect()->back()->with('success', 'Paciente removido com sucesso!');
        } else {
            return redirect()->back()->withErrors(['mensagem' => 'Nenhum paciente encontrado.']);
        }
    }
}

