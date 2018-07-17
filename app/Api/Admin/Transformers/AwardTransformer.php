<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Admin\Transformers;

use App\Api\Transformers\BaseTransformer;

class AwardTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'desc' => $item->desc,
            'price' => $item->price,
            'total' => $item->total,
            'url' => $item->url,
        ];
    }
}