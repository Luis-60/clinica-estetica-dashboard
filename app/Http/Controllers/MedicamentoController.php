<?php

namespace App\Http\Controllers;

use App\Models\{Medicamento, MarcaMedicamento, CategoriaMedicamento};
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

final class MedicamentoController extends Controller
{
    public function index()
    {
        return inertia('medicamentos/index', [
            'medicamentos' => Medicamento::with(['marcas', 'categorias'])->get(),
            'marcas' => MarcaMedicamento::all(),
            'categorias' => CategoriaMedicamento::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'valor' => 'required|numeric|min:0',
            'estoque' => 'required|integer|min:0',
            'categorias_id' => 'required|integer|exists:categorias_medicamentos,id',
            'marcas_id' => 'required|integer|exists:marcas_medicamentos,id',
            'imagem' => 'nullable|image|max:2048',
        ]);

        try {
            if ($request->hasFile('imagem')) {
                $validated['imagem'] = $request->file('imagem')->store('medicamentos', 'public');
            }

            Medicamento::create($validated);

            return redirect()->back()->with('success', 'Medicamento criado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao criar medicamento: ' . $th->getMessage()]);
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'valor' => 'required|numeric|min:0',
            'estoque' => 'required|integer|min:0',
            'categorias_id' => 'required|integer|exists:categoria_medicamentos,id',
            'marcas_id' => 'required|integer|exists:marca_medicamentos,id',
            'imagem' => 'nullable|image|max:2048',
        ]);

        try {
            $medicamento = Medicamento::findOrFail($id);

            if ($request->hasFile('imagem')) {
                // Exclui a imagem anterior se existir
                if ($medicamento->imagem && Storage::disk('public')->exists($medicamento->imagem)) {
                    Storage::disk('public')->delete($medicamento->imagem);
                }

                $validated['imagem'] = $request->file('imagem')->store('medicamentos', 'public');
            }

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

            // Remove a imagem associada
            if ($medicamento->imagem && Storage::disk('public')->exists($medicamento->imagem)) {
                Storage::disk('public')->delete($medicamento->imagem);
            }

            $medicamento->delete();

            return redirect()->back()->with('success', 'Medicamento removido com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao remover medicamento: ' . $th->getMessage()]);
        }
    }
    public function updateEstoque(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'estoque' => 'required|integer|min:0',
        ]);

        try {
            $medicamento = Medicamento::findOrFail($id);
            $medicamento->update(['estoque' => $validated['estoque']]);

            return redirect()->back()->with('success', 'Estoque atualizado com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar estoque: ' . $th->getMessage()]);
        }
    }

}
