<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Transformers;

class UserDetailTransformer extends BaseTransformer
{
    public function transform($item)
    {
        $extra = [];
        if(isset($item->token)){
            $extra['token'] = $item->token;
        }
        return [
            'id' => $item->id,
            'name' => $item->name ?: '',
            'oppo_id' => $item->oppo_id ?: '',
            'mobile' => $item->mobile ?: '',
            'b1_draw_count' => $item->b1_draw_count,
            'b1_praised' => $item->b1_praised,
            'a1_draw_count' => $item->a1_draw_count,
            'a1_voted' => $item->a1_voted,
        ] + $extra;
    }
}