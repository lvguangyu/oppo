<?php

namespace App\Api\Controllers;

use App\Api\Transformers\CommentTransformer;
use App\Comment;
use Illuminate\Http\Request;

class CommentController extends BaseController
{
    public function store(Request $request)
    {
        $user = $this->getApiBaseUser();
        $res = Comment::create($request->all() + ['user_id' => $user->id]);
        return $this->autoResponse($res);
    }

    public function index(Request $request)
    {
        $user = $this->getApiBaseUser();
        $list = Comment::latest()->where('public', 1)->orWhere('user_id', $user->id)->paginate(3);
        return $this->response->paginator($list, new CommentTransformer());
    }
}
