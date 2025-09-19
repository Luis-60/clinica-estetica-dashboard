<?php

namespace App\Http\Controllers\Settings;

use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    public function atualizarDados(Request $request): RedirectResponse
    {
        $validacoes = [
            'senha' => ['required', 'confirmed', Rules\Password::defaults()],
            'endereco' => 'required|string|max:255',
            'cep' => 'required|string|max:10',
            'bairro' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|max:2',
            'telefone' => 'nullable|string|max:20',
        ];

        if ($request->user()->aluno_AEDB == 1) {
            $validacoes['matricula'] = 'required|string|max:255';
        }

        $request->validate($validacoes);


        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

        $request->user()->senhaHash = Hash::make($request->senha);
        $request->user()->endereco = $request->endereco;
        $request->user()->cep = $request->cep;
        $request->user()->bairro = $request->bairro;
        $request->user()->cidade = $request->cidade;
        $request->user()->estado = $request->estado;
        $request->user()->telefone = $request->telefone;

        $request->user()->save();

        return back()->with('success', 'Dados atualizados com sucesso!');
    }

    public function show(Request $request, $id): Response
    {
        dd($request);
        $user = Usuario::findOrFail($id);

        return Inertia::render('profile/index', [
            'usuario' => $user,
        ]);
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
