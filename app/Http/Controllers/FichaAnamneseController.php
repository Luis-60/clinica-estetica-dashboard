<?php

namespace App\Http\Controllers;

use App\Models\FichaAnamnese;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Inertia\Response;

final class FichaAnamneseController extends Controller
{
    public function index()
    {
        return inertia('fichas/index', [
            'fichas' => FichaAnamnese::with('paciente')->latest()->get()
        ]);
    }

    public function show($id): Response
    {
        try {
            $ficha = FichaAnamnese::with('paciente')->findOrFail($id);
            
            return inertia('fichas/show', [
                'ficha' => $ficha,
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('fichas.index')
                ->withErrors(['mensagem' => 'Ficha não encontrada.']);
        }
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // Campos boolean
            'lente_contato' => 'boolean',
            'epilepsia_convulsoes' => 'boolean',
            'funciona_instest_reg' => 'boolean',
            'trat_facial_anterior' => 'boolean',
            'agua_freq' => 'boolean',
            'bebida_alcool' => 'boolean',
            'filtro_solar' => 'boolean',
            'periodo_menstrual' => 'boolean',
            'boa_qual_sono' => 'boolean',
            'protese_corpo_fac' => 'boolean',
            'tabagismo' => 'boolean',
            'alteracoes_cardiacas' => 'boolean',
            'portador_marcapasso' => 'boolean',
            'gestante' => 'boolean',
            'problema_pele' => 'boolean',
            'tratamento_medico' => 'boolean',
            'tumor_lesao_cancer' => 'boolean',
            'boa_alimentacao' => 'boolean',
            
            // Campos string
            'horas_por_noite' => 'nullable|string|max:100',
            'qual_anticoncepcional' => 'nullable|string|max:100',
            'tempo_gestante' => 'nullable|string|max:100',
            'motivo_estetico' => 'nullable|string',
            
            // Relacionamento
            'pacientes_id' => 'required|integer|exists:pacientes,id',
        ]);

        try {
            $ficha = FichaAnamnese::create($validated);

            return redirect()->back()->with('success', 'Ficha de anamnese criada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao criar ficha de anamnese: ' . $th->getMessage()]);
        }
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            // Campos boolean
            'lente_contato' => 'boolean',
            'epilepsia_convulsoes' => 'boolean',
            'funciona_instest_reg' => 'boolean',
            'trat_facial_anterior' => 'boolean',
            'agua_freq' => 'boolean',
            'bebida_alcool' => 'boolean',
            'filtro_solar' => 'boolean',
            'periodo_menstrual' => 'boolean',
            'boa_qual_sono' => 'boolean',
            'protese_corpo_fac' => 'boolean',
            'tabagismo' => 'boolean',
            'alteracoes_cardiacas' => 'boolean',
            'portador_marcapasso' => 'boolean',
            'gestante' => 'boolean',
            'problema_pele' => 'boolean',
            'tratamento_medico' => 'boolean',
            'tumor_lesao_cancer' => 'boolean',
            'boa_alimentacao' => 'boolean',
            
            // Campos string
            'horas_por_noite' => 'nullable|string|max:100',
            'qual_anticoncepcional' => 'nullable|string|max:100',
            'tempo_gestante' => 'nullable|string|max:100',
            'motivo_estetico' => 'nullable|string',
            
            // Relacionamento
            'pacientes_id' => 'required|integer|exists:pacientes,id',
        ]);

        try {
            $ficha = FichaAnamnese::findOrFail($id);
            $ficha->update($validated);

            return redirect()->back()->with('success', 'Ficha de anamnese atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao atualizar ficha de anamnese: ' . $th->getMessage()]);
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $ficha = FichaAnamnese::findOrFail($id);
            $ficha->delete();
            
            return redirect()->back()->with('success', 'Ficha de anamnese removida com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['mensagem' => 'Erro ao remover ficha de anamnese: ' . $th->getMessage()]);
        }
    }

    /**
     * Busca fichas por paciente
     */
    public function byPaciente($pacienteId): Response
    {
        try {
            $paciente = Paciente::findOrFail($pacienteId);
            $fichas = FichaAnamnese::where('pacientes_id', $pacienteId)->latest()->get();
            
            return inertia('fichas/by-paciente', [
                'paciente' => $paciente,
                'fichas' => $fichas,
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('pacientes.index')
                ->withErrors(['mensagem' => 'Paciente não encontrado.']);
        }
    }
}
