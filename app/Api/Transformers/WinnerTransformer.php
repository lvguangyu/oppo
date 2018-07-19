<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Transformers;

class WinnerTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'mobile' => $item->mobile,
            'mobile2' => $item->mobile2,
            'award' => $item->award ? [
                'title' => $item->award->title,
                'desc' => $item->award->desc,
                'url' => $item->award->url,
            ] : [],
            'created_at' => $item->created_at->toDateTimeString(),
        ];
    }
}