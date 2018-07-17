<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/27
 * Time: 下午12:29
 */

namespace App\Api\Admin\Transformers;

use App\Api\Transformers\BaseTransformer;

class WordTransformer extends BaseTransformer
{
    public function transform($item)
    {
        return [
            'id' => $item->id,
            'content' => $item->content,
        ];
    }
}