<?php

namespace App\Http\Controllers;

use App\Models\MarcaMedicamento;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

final class MarcaController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        try {
            MarcaMedicamento::create($validated);

            return redirect()->back()->with('success', 'Marca criada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar marca: ' . $th->getMessage()]);
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        try {
            $marca = MarcaMedicamento::findOrFail($id);
            $marca->update($validated);

            return redirect()->back()->with('success', 'Marca atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar marca: ' . $th->getMessage()]);
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $marca = MarcaMedicamento::findOrFail($id);
            $marca->delete();

            return redirect()->back()->with('success', 'Marca removida com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao remover marca: ' . $th->getMessage()]);
        }
    }
}
