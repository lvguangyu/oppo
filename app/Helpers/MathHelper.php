<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/25
 * Time: 上午9:59
 */

function realViews($views, $times = 50)
{
    return ($times + 1) * $views + rand(0, $times);
}

function rad($d)
{
    return $d * pi() / 180.0;
}