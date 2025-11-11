<?php

namespace App\Http\Controllers;

use App\Models\Medicamento;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

final class MedicamentoController extends Controller
{

    public function index()
    {

        return inertia('medicamentos/index', [
            'medicamentos' => Medicamento::all()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'medicamento' => 'required|string|max:500',
            'observacoes' => 'nullable|string',
            'pacientes_id' => 'required|integer|exists:pacientes,id',
        ]);

        try {
            Medicamento::create($validated);

            return redirect()->back()->with('success', 'Medicamento criado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar medicamento: ' . $th->getMessage()]);
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
            $medicamento = Medicamento::findOrFail($id);
            $medicamento->update($validated);

            return redirect()->back()->with('success', 'Medicamento atualizado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar medicamento: ' . $th->getMessage()]);
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $medicamento = Medicamento::findOrFail($id);
            $medicamento->delete();

            return redirect()->back()->with('success', 'Medicamento removido com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao remover medicamento: ' . $th->getMessage()]);
        }
    }
}
