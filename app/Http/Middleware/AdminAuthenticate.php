<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminAuthenticate
{
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if ($request->path() == 'admin/login'
            || $request->path() == 'admin/init')
        {
            return $next($request);
        }

        if (\Auth::user()
            && (\Auth::user()->hasRole('admin') || \Auth::user()->hasRole('editor'))) {
            return $next($request);
        }

        \Auth::logout();
        return redirect()->guest('admin/login');
    }
}
