<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Admin\Transformers;

use App\Api\Transformers\BaseTransformer;

class ProductionTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'url' => $item->url,
            'is_up_wall' => $item->is_up_wall,
            'shown_wall' => $item->shown_wall,
            'excellent' => $item->excellent,
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