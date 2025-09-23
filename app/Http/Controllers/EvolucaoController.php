<?php

namespace App\Http\Controllers;

use App\Models\Evolucao;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

final class EvolucaoController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'procedimento' => 'required|string|max:500',
            'observacoes' => 'nullable|string',
            'pacientes_id' => 'required|integer|exists:pacientes,id',
        ]);

        try {
            Evolucao::create($validated);

            return redirect()->back()->with('success', 'Evolução criada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar evolução: ' . $th->getMessage()]);
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'procedimento' => 'required|string|max:500',
            'observacoes' => 'nullable|string',
        ]);

        try {
            $evolucao = Evolucao::findOrFail($id);
            $evolucao->update($validated);

            return redirect()->back()->with('success', 'Evolução atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar evolução: ' . $th->getMessage()]);
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $evolucao = Evolucao::findOrFail($id);
            $evolucao->delete();

            return redirect()->back()->with('success', 'Evolução removida com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao remover evolução: ' . $th->getMessage()]);
        }
    }
}
