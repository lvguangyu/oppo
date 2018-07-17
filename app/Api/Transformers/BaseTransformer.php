<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/9
 * Time: 下午6:44
 */

namespace App\Api\Transformers;

use League\Fractal\TransformerAbstract;

class BaseTransformer extends TransformerAbstract
{
    public function transform($obj)
    {
        return $obj->toArray();
    }
}