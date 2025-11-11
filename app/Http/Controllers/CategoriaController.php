<?php

namespace App\Http\Controllers;

use App\Models\CategoriaMedicamento;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

final class CategoriaController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        try {
            CategoriaMedicamento::create($validated);

            return redirect()->back()->with('success', 'Categoria criada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar categoria: ' . $th->getMessage()]);
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        try {
            $categoria = CategoriaMedicamento::findOrFail($id);
            $categoria->update($validated);

            return redirect()->back()->with('success', 'Categoria atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar categoria: ' . $th->getMessage()]);
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $categoria = CategoriaMedicamento::findOrFail($id);
            $categoria->delete();

            return redirect()->back()->with('success', 'Categoria removida com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao remover categoria: ' . $th->getMessage()]);
        }
    }
}
