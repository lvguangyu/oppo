<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Middleware\GetUserFromToken;

class ApiGetUserFromToken extends GetUserFromToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        $token = $request->get('token', null);
        if ($request->headers->has('x-token') && !$request->exists('token')) {
            $token = $request->headers->get('x-token');
        }
        $request->query->add([
            'token' => $token
        ]);

        $errorHandle = 'App\Http\Controllers\Controller@responseFailed';

        if (!$token = $this->auth->setRequest($request)->getToken()) {
            return app()->call($errorHandle, ['data' => [
                'message' => 'token_not_provided',
                'code' => 51001
            ]]);
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            return app()->call($errorHandle, ['data' => [
                'message' => 'token_expired',
                'code' => 51002
            ]]);
        } catch (JWTException $e) {
            return app()->call($errorHandle, ['data' => [
                'message' => 'token_invalid',
                'code' => 51003
            ]]);
        }

        if (!$user) {
            return app()->call($errorHandle, ['data' => [
                'message' => 'user_not_found',
                'code' => 51004
            ]]);
        }

        $this->events->fire('tymon.jwt.valid', $user);

        return $next($request);
    }
}
