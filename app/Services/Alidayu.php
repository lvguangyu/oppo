<?php

namespace App\Services;

use Flc\Alidayu\Client;
use Flc\Alidayu\Requests\IRequest;

class Alidayu
{

    public function __construct()
    {
        // 配置信息
        $config = [
            'app_key'    => config('alisms.KEY'),
            'app_secret' => config('alisms.SECRETKEY'),
//            'sandbox'    => env('APP_DEBUG'),  // 是否为沙箱环境，默认false
        ];

        Client::configure($config);
    }
    
    public function send($cellphone, $smsName, $content, $smsTempId)
    {
        return Client::request('alibaba.aliqin.fc.sms.num.send', function (IRequest $req)
            use ($cellphone, $smsName, $content, $smsTempId) {
            $content = json_decode(str_replace('\'','"', $content), true);
            $req->setRecNum($cellphone)
                ->setSmsParam($content)
                ->setSmsFreeSignName($smsName)
                ->setSmsTemplateCode($smsTempId);
        });
    }
    
    public function sendVoice($cellphone, $content, $smsTempId)
    {
        return Client::request('alibaba.aliqin.fc.tts.num.singlecall', function (IRequest $req)
        use ($cellphone, $content, $smsTempId) {
            $content = json_decode(str_replace('\'','"', $content), true);
            $req->setCalledNum($cellphone)
                ->setTtsParam($content)
                ->setCalledShowNum('02066203390')
                ->setTtsCode($smsTempId);
        });
    }

}