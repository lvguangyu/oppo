<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Transformers;

class AwardTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'desc' => $item->desc,
            'total' => $item->total,
            'price' => $item->price,
            'url' => $item->url,
            'created_at' => $item->created_at->toDateTimeString(),
        ];
    }
}