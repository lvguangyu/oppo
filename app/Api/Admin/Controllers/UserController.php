<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/9
 * Time: 下午5:43
 */

namespace App\Api\Admin\Controllers;

use App\Api\Admin\Transformers\UserDetailTransformer;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends BaseController
{
    public function login(Request $request)
    {
        $credentials = $request->only('oppo_id');

        try {
            $user = User::where('oppo_id', $request->get('oppo_id'))->first();
            // attempt to verify the credentials and create a token for the user
            if (! $token = \JWTAuth::fromUser($user)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
//            if (! $token = \JWTAuth::attempt($credentials)) {
//                return response()->json(['error' => 'invalid_credentials'], 401);
//            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return $this->responseSuccess(['data' => ['token' => $token]]);
    }
    
    public function logout()
    {
        return $this->responseSuccess();
    }
    
    public function info()
    {
        $user = $this->getApiBaseUser();
        return $this->response->item($user, new UserDetailTransformer());
    }

}