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
            'nome' => 'required|string|max:255',
            'data_nasc' => 'required|date',
            'endereco' => 'required|string|max:500',
            'telefone' => 'required|string|max:20',
            'sexo' => 'required|string|in:masculino,feminino',
            'rede_social' => 'nullable|string|max:255',
        ]);

        try {
            $paciente = Paciente::create([
                'nome' => $validated['nome'],
                'data_nasc' => $validated['data_nasc'],
                'endereco' => $validated['endereco'],
                'telefone' => $validated['telefone'],
                'sexo' => $validated['sexo'],
                'rede_social' => $validated['rede_social'],
                'usuarios_id' => auth()->id(), // Associa ao usuário logado
            ]);

            return redirect()->back()->with('success', 'Paciente cadastrado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao tentar cadastrar paciente: ' . $th->getMessage()]);
        }
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer|exists:pacientes,id',
            'nome' => 'required|string|max:255',
            'data_nasc' => 'required|date',
            'endereco' => 'required|string|max:500',
            'telefone' => 'required|string|max:20',
            'sexo' => 'required|string|in:masculino,feminino',
            'rede_social' => 'nullable|string|max:255',
        ]);

        try {
            $paciente = Paciente::findOrFail($validated['id']);
            $paciente->update([
                'nome' => $validated['nome'],
                'data_nasc' => $validated['data_nasc'],
                'endereco' => $validated['endereco'],
                'telefone' => $validated['telefone'],
                'sexo' => $validated['sexo'],
                'rede_social' => $validated['rede_social'],
            ]);

            return redirect()->back()->with('success', 'Paciente atualizado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao tentar atualizar paciente: ' . $th->getMessage()]);
        }
    }

    public function destroy($id): RedirectResponse
    {
        $deleted = Paciente::where('id', $id)->delete();
        if ($deleted) {
            return redirect()->route('pacientes.index')->with('success', 'Paciente removido com sucesso!');
        } else {
            return redirect()->back()->withErrors(['mensagem' => 'Nenhum paciente encontrado.']);
        }
    }
    public function show($id): Response
    {
        $paciente = Paciente::with(['consultas', 'evolucoes', 'fichasAnamnese'])->findOrFail($id);

        return inertia('paciente/index', [
            'paciente' => $paciente,
            'consultas' => $paciente->consultas ?? [],
            'evolucoes' => $paciente->evolucoes ?? [],
            'fichas' => $paciente->fichasAnamnese ?? [],
        ]);
    }
}

