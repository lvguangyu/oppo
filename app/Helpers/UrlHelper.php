<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/25
 * Time: 上午9:59
 */

function getSurface($item, $fullPath = true)
{
    if ($fullPath) {
        return $item->surface_ori ? OssImgUrl($item->surface_ori) : OssImgUrl($item->surface);
    }

    return $item->surface_ori ? $item->surface_ori : $item->surface;
}

function OssImgUrl($url, $fullPath = true, $compress = '')
{
    if ($url == '') {
        return $url;
    }

    $url = str_replace('img1.uullnn.com', 'img2.uullnn.com', $url);

    $url = parseUrl(str_replace(Config::get('app.IMG_OLD_URL'), '', $url));
    if (strpos($url, "http://") === false
        && strpos($url, "https://") === false
    ) {
        return $fullPath ? Config::get('app.IMG_URL') . $url . $compress : $url . $compress;
    }

    return $url;
}

function OssUrlWithWH($url, $w, $h)
{
    if (strpos($url, "http://img1.uullnn.com") === false) {
        return $url;
    }
    return str_replace(Config::get('app.IMG_URL'), Config::get('app.IMG_COVER_URL'), $url) . '_' . $w . 'x' . $h . '.jpg';
}

function ContentOnlyUrl($url)
{
    $params = [];
    if (Request::get('contentOnly')) $params['contentOnly'] = Request::get('contentOnly');
    if (!empty($params)) {
        $url = (strpos($url, "?") === false) ? $url . '?' : $url . '&';
        $url .= http_build_query($params);
    }
    return $url;
}

function parseUrl($url = "")
{
    if (preg_match("/[\x7f-\xff]/", $url)) {
        $url = rawurlencode($url);
        $a = array("%3A", "%2F", "%40");
        $b = array(":", "/", "@");
        $url = str_replace($a, $b, $url);
    }

    return $url;
}

function tbItemUrl($url, $ali_trackid)
{
    return str_replace('2:mm_113253563_12248245_46642748', $ali_trackid, $url);
}

function tbImgUrl($url)
{
    if (strpos($url, "http://") === false) {
        return 'https://gd4.alicdn.com/bao/uploaded/' . $url;
    }
    return OssImgUrl($url);
}

function tbImgUrlWithWH($url, $w, $h)
{
    return $url . '_' . $w . 'x' . $h . '.jpg';
}

function tbCDNFullUrl($url)
{
    if (strpos($url, "http:") === false) {
        return 'http:' . $url;
    }
    return $url;
}

function dumpImageKey($rand = 3, $folder = '', $ext = 'jpg')
{
    return ($folder === '' ? '' : $folder . '/') .
        date('Y/m/d') . '/' .
        date('Ymdhis', time()) .
        rand(pow(10, $rand), pow(10, $rand + 1) - 1) . str_random($rand) . '.' . $ext;
}