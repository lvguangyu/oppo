<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/9
 * Time: 下午5:43
 */

namespace App\Api\Controllers;

use App\Api\Transformers\UserDetailTransformer;
use App\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function show()
    {
        $user = $this->getApiBaseUser();
        return $this->response->item($user, new UserDetailTransformer());
    }
    
    public function refresh()
    {
        $user = $this->getApiBaseUser();
        $user->token = \JWTAuth::fromUser($user);
        return $this->response->item($user, new UserDetailTransformer());
    }
    
    public function login(Request $request)
    {
        $user = User::firstOrCreate([
            'oppo_id' => $request->get('oppoId'),
        ]);

        $user->token = \JWTAuth::fromUser($user);
        return $this->response->item($user, new UserDetailTransformer());
    }
}