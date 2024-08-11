<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        // L'utilisateur doit être authentifié et avoir le rôle d'admin (par exemple, role == 2)
        if ($request->user() && $request->user()->role == 2) {
            return $next($request);
        }

        // Si l'utilisateur n'a pas le rôle d'admin, renvoyer une 404
        throw new NotFoundHttpException();
    }
}
