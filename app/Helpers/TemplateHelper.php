<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/25
 * Time: 上午9:59
 */

function adminLink($url, $text, $class = 'btn-primary', $target = '_blank')
{
    return '<a href="' . url($url) . '" target="' . $target . '"><button type="button" class="btn ' . $class . ' btn-xs">' . $text . '</button></a>';
}