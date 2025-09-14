<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\CursoPeriodo;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailConfirmacao;
use App\Services\UsuariosService;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, UsuariosService $usuario_service)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . Usuario::class,
            'senhaHash' => ['required', 'confirmed', Rules\Password::defaults()],
            'endereco' => 'required|string|max:255',
            'cep' => 'required|string|max:10',
            'bairro' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|max:2',
            'telefone' => 'nullable|string|max:20',
        ]);

        $user = $usuario_service->criarUsuario($request->all());

        // Gera token de confirmação único
        $token = bin2hex(random_bytes(32));
        $user->token_recuperacao = $token;
        $user->save();

        // Gera URL de confirmação com token
        $confirmationUrl = url('/confirmacao?token=' . $token);
        Mail::to($user->email)->send(new EmailConfirmacao($user, $confirmationUrl));

        // Não faz login automático, apenas retorna sucesso para o frontend
        return Inertia::render('auth/confirmacao', [
            'success' => true,
            'message' => 'Você recebeu um email de confirmação. Assim que você confirmar, você será redirecionado ao sistema.'
        ]);
    }
}
