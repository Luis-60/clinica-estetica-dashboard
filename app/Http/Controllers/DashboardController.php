<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Models\Consulta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Se for paciente
        if ($user->role === 'user') {
            // Verifica se o usuário tem um pacientes_id
            if (!$user->pacientes_id) {
                return Inertia::render('menu', [
                    'stats' => null,
                    'paciente' => null,
                    'message' => 'Nenhum paciente associado ao usuário.'
                ]);
            }

            // Verifica se o paciente existe
            $paciente = Paciente::find($user->pacientes_id);
            if (!$paciente) {
                return Inertia::render('menu', [
                    'stats' => null,
                    'paciente' => null,
                    'message' => 'Paciente não encontrado.'
                ]);
            }

            // Redireciona para a página do paciente
            return redirect()->route('paciente.show', $user->pacientes_id);
        }

        // ADMIN ↓↓↓
        $hoje = Carbon::today();
        $inicioSemana = Carbon::now()->startOfWeek();
        $fimSemana = Carbon::now()->endOfWeek();
        $inicioMes = Carbon::now()->startOfMonth();
        $fimMes = Carbon::now()->endOfMonth();

        $totalPacientes = Paciente::count();
        $consultasHoje = Consulta::whereDate('data', $hoje)->count();
        $consultasSemana = Consulta::whereBetween('data', [$inicioSemana, $fimSemana])->count();
        $faturamentoMes = Consulta::whereBetween('data', [$inicioMes, $fimMes])
            ->join('procedimentos', 'consultas.procedimentos_id', '=', 'procedimentos.id')
            ->sum('procedimentos.preco');

        return Inertia::render('menu', [
            'stats' => [
                'totalPacientes' => $totalPacientes,
                'consultasHoje' => $consultasHoje,
                'consultasSemana' => $consultasSemana,
                'faturamentoMes' => $faturamentoMes,
            ],
            'paciente' => null
        ]);
    }
}