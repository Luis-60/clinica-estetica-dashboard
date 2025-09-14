<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccountType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        // Se roles foram passadas, verifica
        if (count($roles) > 0 && !$user->hasAnyRole($roles)) {
            abort(403, 'Acesso não autorizado'); // ou redirect para página de erro
        }

        return $next($request);
    }

}
