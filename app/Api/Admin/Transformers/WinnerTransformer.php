<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Admin\Transformers;

use App\Api\Transformers\BaseTransformer;

class WinnerTransformer extends BaseTransformer
{
    public function transform($item)
    {
        $user = $item->user;

        return [
            'id' => $item->id,
            'created_at' => $item->created_at->toDateTimeString(),
            'user' => [
                'username' => $item->username,
                'mobile' => $item->mobile2 ?: $item->mobile,
                'oppo_id' => $user->oppo_id,
            ],
            'award' => [
                'title' => $item->award->title,
                'desc' => $item->award->desc,
                'type' => $item->award->type,
            ]
        ];
    }
}