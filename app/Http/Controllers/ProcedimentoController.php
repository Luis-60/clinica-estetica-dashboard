<?php

namespace App\Http\Controllers;

use App\Models\Procedimento;
use Illuminate\Http\Request;
use Inertia\Response;

class ProcedimentoController extends Controller
{
    /**
     * Display a listing of recursos.
     */
    public function index(): Response
    {
        $procedimentos = Procedimento::all();

        return inertia('procedimentos/index', [
            'procedimentos' => $procedimentos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'nullable|numeric',
            'ativo' => 'nullable|boolean',
        ]);

        try {
            $procedimento = Procedimento::create([
                'nome' => $validated['nome'],
                'descricao' => $validated['descricao'] ?? null,
                'preco' => isset($validated['preco']) ? $validated['preco'] : null,
                'ativo' => $validated['ativo'] ?? true,
            ]);
        } catch (\Throwable $th) {
            \Log::error('ProcedimentoController@store error', ['message' => $th->getMessage(), 'input' => $request->all()]);
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao criar procedimento: ' . $th->getMessage()]);
        }

        return redirect()->back()->with('success', 'Procedimento criado com sucesso!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'nullable|numeric',
            'ativo' => 'nullable|boolean',
        ]);

        $procedimento = Procedimento::findOrFail($id);

        try {
            $procedimento->update([
                'nome' => $validated['nome'],
                'descricao' => $validated['descricao'] ?? null,
                'preco' => isset($validated['preco']) ? $validated['preco'] : null,
                'ativo' => $validated['ativo'] ?? true,
            ]);
        } catch (\Throwable $th) {
            \Log::error('ProcedimentoController@update error', ['message' => $th->getMessage(), 'id' => $id, 'input' => $request->all()]);
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao atualizar procedimento: ' . $th->getMessage()]);
        }

        return redirect()->back()->with('success', 'Procedimento atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            Procedimento::where('id', $id)->delete();
        } catch (\Throwable $th) {
            \Log::error('ProcedimentoController@destroy error', ['message' => $th->getMessage(), 'id' => $id]);
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao remover procedimento: ' . $th->getMessage()]);
        }

        return redirect()->back()->with('success', 'Procedimento removido com sucesso!');
    }
}
