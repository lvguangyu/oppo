<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/9
 * Time: 下午6:36
 */

namespace App\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Api\Transformers\BaseTransformer;
use App\User;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public $creditChanged = 0;
    protected $limit = 24;

    function __construct(Request $request)
    {
        $this->limit = $request->get('limit', $this->limit);
    }
    
    public function getApiBaseUser()
    {
        return app('Dingo\Api\Auth\Auth')->user();
    }

    public function option()
    {
        return $this->responseSuccess();
    }

    protected function paginate($data)
    {
        $data = $data->morph('json')->getContent();
        $data = json_decode($data, true);

        return $this->response->array([
            'data' => [
                'totalPage' => $data['pagination']['total_pages'],
                'count' => $data['pagination']['count'],
                'page' => $data['pagination']['current_page'],
                'list' => $data['data']
            ]
        ], new BaseTransformer)->morph('json');
    }
}