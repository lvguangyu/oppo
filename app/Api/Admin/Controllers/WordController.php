<?php

namespace App\Api\Admin\Controllers;

use App\Api\Admin\Transformers\WordTransformer;
use App\CommentSensitiveWord;
use Illuminate\Http\Request;

class WordController extends BaseController
{
    public function index(Request $request)
    {
        $list = CommentSensitiveWord::latest();
        $list = $list->get();
        return $this->response->collection($list, new WordTransformer());
    }

    public function update($id, Request $request)
    {
        $res = CommentSensitiveWord::find($id)->update($request->all());
        return $this->autoResponse($res);
    }

    public function store(Request $request)
    {
        $res = CommentSensitiveWord::create($request->all());
        return $this->autoResponse($res);
    }

    public function destroy(Request $request)
    {
        $res = CommentSensitiveWord::where('content', $request->get('content'))->delete();
        return $this->autoResponse($res);
    }
}
