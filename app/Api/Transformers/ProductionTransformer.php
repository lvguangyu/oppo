<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Transformers;

class ProductionTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'url' => $item->url,
            'is_up_wall' => $item->is_up_wall,
            'shown_wall' => $item->shown_wall,
            'voted' => $item->voted,
            'created_at' => $item->created_at->toDateTimeString(),
            'user' => [
                'id' => $item->user->id,
                'oppo_id' => $item->user->oppo_id,
                'mobile' => $item->user->mobile,
            ],
        ];
    }
}