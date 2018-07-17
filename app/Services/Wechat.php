<?php

namespace App\Services;

use EasyWeChat\Message\Text;
use EasyWeChat\Core\Exception;
use EasyWeChat\Foundation\Application;
use Overtrue\Socialite\AuthorizeFailedException;

class Wechat
{
    private $app;

    public function __construct()
    {
        // 配置信息
        $config = config('wechat');

        $this->app = new Application($config);
    }

    public function getOauthUser()
    {
        try {
            $oauth = $this->app->oauth;
            // 获取 OAuth 授权结果用户信息
            $user = $oauth->user();
            return $user->toArray();
        } catch (AuthorizeFailedException $e) {
            \Log::error(json_encode($e));
            return false;
        }
    }

    /**
     *
     * @return string
     */
    public function js_config()
    {
        try{
            return $this->app->js;
        } catch (\Exception $e){
            return $e;
        }
    }
    
    public function staff_notice($content, $openid)
    {
        $message = new Text(['content' => $content]);
        try {
            return $this->app->staff->message($message)->to($openid)->send();
        } catch (Exception $e) {
            \Log::error(json_encode($e));
            return false;
        }
    }

    public function template_notice($openid, $templateId, $data, $url)
    {
        try {
            return $this->app->notice->uses($templateId)
                ->withUrl($url)
                ->andData($data)
                ->andReceiver($openid)
                ->send();
        } catch (Exception $e) {
            \Log::error(json_encode($e));
            return false;
        }
    }
}