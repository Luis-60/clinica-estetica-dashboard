<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use Illuminate\Http\Request;
use Inertia\Response;
use Carbon\Carbon;

class ConsultaController extends Controller
{
    public function index(): Response
    {
        $consultas = Consulta::with(['paciente', 'procedimento'])->latest()->get();
        $pacientes = \App\Models\Paciente::all();
        $procedimentos = \App\Models\Procedimento::all();

        return inertia('consultas/index', [
            'consultas' => $consultas,
            'pacientes' => $pacientes,
            'procedimentos' => $procedimentos,
        ]);
    }
    
    public function store(Request $request)
    {
        // Log incoming request for debugging
        \Log::info('ConsultaController@store input', $request->all());

        $validated = $request->validate([
            'pacientes_id' => 'required|exists:pacientes,id',
            'data'        => 'required|date',
            'procedimento_id'   => 'required|exists:procedimentos,id',
        ]);

        // Normalize incoming datetime (ISO with Z / milliseconds) to MySQL DATETIME format
        try {
            if (!empty($validated['data'])) {
                // Carbon can parse ISO formats with timezone designator
                $dt = Carbon::parse($validated['data']);
                // Format as 'Y-m-d H:i:s' (MySQL DATETIME)
                $validated['data'] = $dt->format('Y-m-d H:i:s');
            }

            $consulta = Consulta::create([
                'pacientes_id' => $validated['pacientes_id'],
                'data' => $validated['data'],
                'procedimentos_id' => $validated['procedimento_id'],
            ]);

        } catch (\Throwable $th) {
            // Log exception details
            \Log::error('ConsultaController@store error', ['message' => $th->getMessage(), 'trace' => $th->getTraceAsString(), 'input' => $request->all()]);

            return redirect()->back()->withErrors(['mensagem' => 'Erro ao tentar adicionar Consulta: ' . $th->getMessage()]);
        }

        return redirect()->back()->with('success', 'Consulta adicionada com sucesso!');
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
            'procedimento_id'   => 'required|exists:procedimentos,id',
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