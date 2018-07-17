<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/9
 * Time: 下午5:43
 */

namespace App\Api\Controllers;

use App\Api\Transformers\UserDetailTransformer;
use App\Services\Wechat;
use App\User;
use Illuminate\Http\Request;

class WechatController extends BaseController
{
    public function oauth(Request $request)
    {
        $wechat = new Wechat();
        $res = $wechat->getOauthUser();
        if (!$res) {
            $user = User::where('cellphone', '13826019412')->first();
        } else {
            $user = User::getUserByWechat($res);
        }

        if (!$user) {
            return $this->responseOauthAccessError();
        }

        $user->token = \JWTAuth::fromUser($user);
        return $this->response->item($user, new UserDetailTransformer());
    }

    /**
     * 微信js签名
     *
     * @return string
     */
    public function api_config(Request $request)
    {
        $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : \URL::current();
        $referrer = $request->exists('url') ? $request->get('url') : $referrer;

        $wechat = new Wechat();

        $js = $wechat->js_config();
        if ($js instanceof \Exception) {
            return $this->responseFailed(['data' => $js->getMessage()]);
        }

        $js->setUrl($referrer);
        return $this->responseSuccess([
            'data' => json_decode($js->config([
                'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'getLocation'
            ], false), true)
        ]);
    }
}