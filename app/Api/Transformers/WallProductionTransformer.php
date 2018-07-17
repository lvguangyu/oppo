<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Transformers;

class WallProductionTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'url' => $item->url,
            'shown_wall' => $item->shown_wall,
            'praised' => $item->praised,
            'user' => [
                'id' => $item->user->id,
                'oppo_id' => $item->user->oppo_id,
                'mobile' => $item->user->mobile,
            ],
        ];
    }
}