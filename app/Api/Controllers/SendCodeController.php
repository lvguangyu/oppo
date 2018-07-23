<?php
    /**
     * Created by PhpStorm.
     * User: desand
     * Date: 16/5/9
     * Time: 下午6:36
     */
namespace App\Api\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use SmsManager;
use App\Services\Alidysms;

class SendCodeController extends Controller
{
    public function send_code(Request $request) {

        $mobile = $request->get('mobile');
        $param = str_pad(mt_rand(0, 999999), 6, "0", STR_PAD_BOTH);

        $request->session()->put('code', $param);
        $request->session()->put('mobile', $mobile);

//        $sms = new Alidysms();
//        $res = $sms->send($mobile, $this->smsName, [], '');
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://sms-api.luosimao.com/v1/send.json");

        curl_setopt($ch, CURLOPT_HTTP_VERSION  , CURL_HTTP_VERSION_1_0 );
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 8);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);

        curl_setopt($ch, CURLOPT_HTTPAUTH , CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD  , 'api:key-04fb287dc9d402a7b2fe6d12ab2c061d');

        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array('mobile' => $mobile,'message' => '验证码为' . $param . '，请在活动页面中输入完成验证。愿你以梦为马，诗酒趁年华！【手写诗词大赛】'));

        $res = curl_exec( $ch );
        curl_close( $ch );
        return $res;
    }

    public function validate_code (Request $request) {
        $code = (integer)$request->session()->get('code');
        $mobile = (integer)$request->session()->get('mobile');
        $newMobile = (integer)$request->get('mobile');
        $newCode = (integer)$request->get('code');
        $request->session()->forget('code');
        $request->session()->forget('mobile');
        $result = [];
        $result['error'] = 1;
        $result['msg'] = '验证失败！';
        if($newMobile === $mobile) {
            if($code === $newCode){
                $result['error'] = 0;
                $result['msg'] = '验证成功！';
            }
        }
        return $result;

    }
}