<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Transformers;

class CommentTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'content' => $item->filtered_content,
            'created_at' => $item->created_at->toDateTimeString(),
        ];
    }
}