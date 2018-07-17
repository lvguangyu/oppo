<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/23
 * Time: 下午12:11
 */

namespace App\Services;

use JohnLui\AliyunOSS\AliyunOSS;
use Config;

class OSS
{
    const IS_INTERNAL = 'services.ossUseInternal';

    private $ossClient;
    protected $bucket;

    public function __construct($isInternal = false)
    {
        $serverAddress = $isInternal ? Config::get('services.ossServerInternal') : Config::get('services.ossServer');
        $this->bucket = Config::get('services.ossBucket');
        $this->ossClient = AliyunOSS::boot(
            $serverAddress,
            Config::get('services.AccessKeyId'),
            Config::get('services.AccessKeySecret')
        );
    }

    public function upload_single_data($data)
    {
        $image_keys = dumpImageKey(3, Config::get('app.name'));
        return $this->formatSingleUpload(OSS::uploadDataStr($image_keys, $data), $image_keys);
    }

    /**
     * @param $file
     * @return array|bool
     */
    public function upload_single_image($file)
    {
        $image_keys = dumpImageKey(3, Config::get('app.name'));
        return $this->formatSingleUpload(OSS::upload($image_keys, $file->getRealPath()), $image_keys);
    }

    /**
     * @param $file
     * @return array|bool
     */
    public function upload_single_image_content($content)
    {
        $image_keys = dumpImageKey(3, Config::get('app.name'));
        return $this->formatSingleUpload(OSS::uploadContent($image_keys, $content), $image_keys);
    }

    /**
     * @param $file
     * @return array|bool
     */
    public function upload_single_file($file)
    {
        $image_keys = dumpImageKey(3, Config::get('app.name'), $file->getClientOriginalExtension());
        return $this->formatSingleUpload(OSS::upload($image_keys, $file->getRealPath()), $image_keys);
    }

    /**
     * @param $ossKey
     * @param $filePath
     * @return \Aliyun\OSS\Models\PutObjectResult
     */
    public static function upload($ossKey, $filePath)
    {
        $oss = new OSS(Config::get(self::IS_INTERNAL)); // 上传文件使用内网，免流量费
        $oss->ossClient->setBucket($oss->bucket);
        return $oss->ossClient->uploadFile($ossKey, $filePath);
    }

    /**
     * 直接把变量内容上传到oss
     * @param $osskey
     * @param $content
     */
    public static function uploadContent($osskey, $content)
    {
        $oss = new OSS(Config::get(self::IS_INTERNAL)); // 上传文件使用内网，免流量费
        $oss->ossClient->setBucket($oss->bucket);
        return $oss->ossClient->uploadContent($osskey, $content);
    }

    /**
     * 直接把变量图片字符串内容上传到oss
     * @param $osskey
     * @param $content
     */
    public static function uploadDataStr($osskey, $str)
    {
        $base64_body = substr(strstr($str,','),1);
        $data= base64_decode($base64_body);

        $oss = new OSS(Config::get(self::IS_INTERNAL)); // 上传文件使用内网，免流量费
        $oss->ossClient->setBucket($oss->bucket);
        return $oss->ossClient->uploadContent($osskey, $data);
    }

    public static function getUrl($ossKey)
    {
        $oss = new OSS();
        $oss->ossClient->setBucket($oss->bucket);
        return $oss->ossClient->getUrl($ossKey, new \DateTime("+1 day"));
    }

    public static function createBucket($bucketName)
    {
        $oss = new OSS();
        return $oss->ossClient->createBucket($bucketName);
    }

    public static function getAllObjectKey($bucketName)
    {
        $oss = new OSS();
        return $oss->ossClient->getAllObjectKey($bucketName);
    }

    /**
     * @param $res
     * @param $image_key
     * @return array|bool
     */
    private function formatSingleUpload($res, $image_key)
    {
        if (!empty($res->getETag())) {
            return [
                'data' => ['image' => $image_key, 'link' => OssImgUrl($image_key)],
                'link' => OssImgUrl($image_key)
            ];
        }

        return false;
    }

}