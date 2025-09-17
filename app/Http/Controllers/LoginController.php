<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
/**
 * @OA\Post(
 *     path="/login",
 *     summary="Login do usuário",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email","senha"},
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="senha", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Login bem-sucedido"),
 *     @OA\Response(response=401, description="Credenciais inválidas")
 * )
 */
class LoginController
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'senha');

        if (Auth::attempt([
            'email' => $credentials['email'],
            'senhaHash' => $credentials['senha']
        ])) {
            return response()->json([
                'message' => 'Login bem-sucedido',
            ]);
        }
        return response()->json([
            'message' => 'Credenciais inválidas'
        ], 401);
    }
}
