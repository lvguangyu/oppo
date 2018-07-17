<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Admin\Transformers;

use App\Api\Transformers\BaseTransformer;

class CommentTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'content' => $item->content,
            'public' => $item->public,
            'created_at' => $item->created_at->toDateTimeString(),
            'user' => [
                'id' => $item->user->id,
                'name' => $item->user->name,
                'oppo_id' => $item->user->oppo_id,
                'mobile' => $item->user->mobile,
            ],
        ];
    }
}