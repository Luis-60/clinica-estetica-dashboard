<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmailConfirmacaoController extends Controller
{
    /**
     * Confirma o email do usuário.
     */
    public function confirmar(Request $request)
    {
        $token = $request->query('token');
        $usuario = \App\Models\Usuario::where('token_recuperacao', $token)->first();

        if (!$usuario) {
            return Inertia::render('auth/confirmacao', [
                'success' => false,
                'message' => 'Token inválido ou usuário não encontrado.'
            ]);
        }

        if ($usuario->email_verificado) {
            return Inertia::render('auth/confirmacao', [
                'success' => false,
                'message' => 'Email já confirmado.'
            ]);
        }

        $usuario->email_verificado = 1;
        $usuario->token_recuperacao = null;
        $usuario->save();

        Auth::login($usuario);

        return redirect()->intended('/'); // Redireciona para página principal já logado
    }
}
