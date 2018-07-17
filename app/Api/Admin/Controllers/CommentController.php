<?php

namespace App\Api\Admin\Controllers;

use App\Api\Admin\Transformers\CommentTransformer;
use App\Comment;
use Illuminate\Http\Request;

class CommentController extends BaseController
{
    public function index(Request $request)
    {
        $list = Comment::latest();
        $list = $list->paginate($this->limit);
        return $this->response->paginator($list, new CommentTransformer());
    }

    public function update($id, Request $request)
    {
        $res = Comment::find($id)->update($request->all());
        return $this->autoResponse($res);
    }

    public function store(Request $request)
    {
        $res = Comment::create($request->all());
        return $this->autoResponse($res);
    }

    public function destroy($id)
    {
        $res = Comment::find($id)->delete();
        return $this->autoResponse($res);
    }
}
