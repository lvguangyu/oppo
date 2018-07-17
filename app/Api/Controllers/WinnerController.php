<?php

namespace App\Api\Controllers;

use App\Api\Transformers\AwardTransformer;
use App\Api\Transformers\WinnerTransformer;
use App\Award;
use App\Draw;
use App\User;
use App\Winner;
use Illuminate\Http\Request;

class WinnerController extends BaseController
{
    public function store(Request $request)
    {
        $user = $this->getApiBaseUser();
        $winner = Winner::find($request->get('id'));
        if($winner->user_id === $user->id){
            $res = $winner->update($request->only(['name', 'address']) + [
                    'mobile2' => $request->get('mobile'),
                    'username' => $request->get('oppo_id')
                ]);

            return $this->autoResponse($res);
        }

        return $this->responseFailed([
            'data' => $request->all()
        ]);
    }
    
    public function update(Request $request)
    {
        $user = $this->getApiBaseUser();
        $res = Winner::where('user_id', $user->id)->update($request->only(['name', 'address']) + [
                'mobile2' => $request->get('mobile'),
                'username' => $request->get('oppo_id')
            ]);

        return $this->autoResponse($res);
    }
}
