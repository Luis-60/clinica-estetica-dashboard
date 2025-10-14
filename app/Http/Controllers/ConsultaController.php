<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use Illuminate\Http\Request;
use Inertia\Response;

class ConsultaController extends Controller
{
    public function index(): Response
    {
        $consultas = Consulta::with('paciente')->latest()->get();
        $pacientes = \App\Models\Paciente::all();

        return inertia('consultas/index', [
            'consultas' => $consultas,
            'pacientes' => $pacientes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pacientes_id' => 'required|exists:pacientes,id',
            'data'        => 'required|date',
            'procedimento'=> 'required|string|max:255',
        ]);

        try {
            Consulta::create($validated);
            return redirect()->back()->with('success', 'Consulta marcada com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Erro ao salvar consulta: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show($id): Response
    {
        $consulta = Consulta::with('paciente')->findOrFail($id);

        return inertia('consultas/show', [
            'consulta' => $consulta,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'paciente_id'   => 'required|exists:pacientes,id',
            'data_consulta' => 'required|date',
            'horario'       => 'required|string|max:10',
            'procedimento'  => 'required|string|max:255',
            'observacoes'   => 'nullable|string|max:1000',
        ]);

        $consulta = Consulta::findOrFail($id);
        $consulta->update($validated);

        return redirect()->back()->with('success', 'Consulta atualizada com sucesso!');
    }

    public function destroy($id)
    {
        Consulta::where('id', $id)->delete();

        return redirect()->back()->with('success', 'Consulta removida com sucesso!');
    }
}