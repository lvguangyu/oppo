<?php

namespace App\Http\Controllers;

use App\Api\Transformers\BaseTransformer;
use GuzzleHttp\Client;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Dingo\Api\Routing\Helpers;
use Jenssegers\Agent\Agent;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, Helpers;

    const REQUEST_FAILED = 4000;
    const REQUEST_PARAMETER_ERROR = 4300;
    const REQUEST_OAUTH_ACCESS_ERROR = 5001;
    const REQUEST_APP_ERROR = 5003;

    const REQUIRED = 'required';

    const DEFAULT_CURL_FORMAT = 'array';

    protected $validateErrors;

    public function autoResponse($res, $data = [])
    {
        return $res ? $this->responseSuccess($data) : $this->responseFailed();
    }

    public function responseSuccess(array $data = [], $transformer = null)
    {
        return $this->responseArray($data, $transformer);
    }

    public function responseFailed(array $data = [], $transformer = null)
    {
        $preData = [
            'code' => self::REQUEST_FAILED,
        ];
        $data = array_merge($preData, $data);
        return $this->responseArray($data, $transformer);
    }

    public function responseOauthAccessError(array $data = [], $transformer = null)
    {
        $preData = [
            'code' => self::REQUEST_OAUTH_ACCESS_ERROR,
            'message' => 'Oauth Access Error',
        ];
        $data = array_merge($preData, $data);
        return $this->responseArray($data, $transformer);
    }

    protected function responseArray(array $data = [], $transformer = null)
    {
        $preData['data'] = new \stdClass();
        $data = array_merge($preData, $data);
        $transformer = is_null($transformer) ? new BaseTransformer() : $transformer;
        return $this->response->array($data, $transformer)->morph('json');
    }

    protected function simpleValidator(Request $request, array $rules = [])
    {
        $validator = \Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $this->validateErrors = $this->responseFailed([
                'data' => $validator->errors()->all(),
                'code' => self::REQUEST_PARAMETER_ERROR
            ]);
            return $this->validateErrors;
        }

        return true;
    }

    protected function getValidateErrors()
    {
        return $this->validateErrors;
    }

    protected function getAgent()
    {
        $agent = new Agent();
        return $agent->device() . '#' . $agent->platform() . '#' . $agent->browser();
    }

    public function getToken(Request $request)
    {
        $token = isset($_COOKIE[\Config::get('app.COOKIE_LOGGED_USER')]) ? $_COOKIE[\Config::get('app.COOKIE_LOGGED_USER')] : '';
        if(empty($token)) {
            $token = $request->session()->get(\Config::get('app.COOKIE_LOGGED_USER'));
        }
        return $token;
    }

    public function callUrl($url, $format = self::DEFAULT_CURL_FORMAT)
    {
        $client = new Client();
        $res = $client->get($url);
        if($res->getStatusCode() !== 200){
            return [];
        }

        return json_decode($res->getBody()->getContents(), $format === self::DEFAULT_CURL_FORMAT);
    }

    public function curlPost($url, $data = [], $format = self::DEFAULT_CURL_FORMAT)
    {
        $client = new Client();
        $res = $client->post($url, $data);
        if($res->getStatusCode() !== 200){
            return [];
        }

        return json_decode($res->getBody()->getContents(), $format === self::DEFAULT_CURL_FORMAT);
    }


}
