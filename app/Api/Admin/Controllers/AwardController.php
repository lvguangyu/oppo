<?php

namespace App\Api\Admin\Controllers;

use App\Api\Admin\Transformers\AwardTransformer;
use App\Award;
use Illuminate\Http\Request;

class AwardController extends BaseController
{
    public function index(Request $request)
    {
        $list = Award::latest();
        $list = $list->paginate($this->limit);
        return $this->response->paginator($list, new AwardTransformer());
    }

    public function update($id, Request $request)
    {
        $res = Award::find($id)->update($request->all());
        return $this->autoResponse($res);
    }

    public function store(Request $request)
    {
        $res = Award::create($request->all() + ['type' => $request->get('type', 'B')]);
        return $this->autoResponse($res);
    }

    public function destroy($id)
    {
        $res = Award::find($id)->delete();
        return $this->autoResponse($res);
    }
}
