<?php

namespace App\Services;

use Flc\Dysms\Client;
use Flc\Dysms\Request\SendSms;

class Alidysms
{
    private $client;

    public function __construct()
    {
        // 配置信息
        $config = [
            'accessKeyId'    => config('alisms.KEY'),
            'accessKeySecret' => config('alisms.SECRETKEY'),
        ];

        $this->client = new Client($config);
    }
    
    public function send($cellphone, $smsName, $content, $smsTempId)
    {
        $sendSms = new SendSms;
        $sendSms->setPhoneNumbers($cellphone);
        $sendSms->setSignName($smsName);
        $sendSms->setTemplateCode($smsTempId);
        $sendSms->setTemplateParam($content);

        return $this->client->execute($sendSms);

//        return Client::request('alibaba.aliqin.fc.sms.num.send', function (IRequest $req)
//            use ($cellphone, $smsName, $content, $smsTempId) {
//            $content = json_decode(str_replace('\'','"', $content), true);
//            $req->setRecNum($cellphone)
//                ->setSmsParam($content)
//                ->setSmsFreeSignName($smsName)
//                ->setSmsTemplateCode($smsTempId);
//        });
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