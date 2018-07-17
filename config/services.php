<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    //oss
    'ossServer' => env('OSS_SERVER', 'http://服务器外网地址'), //青岛为 http://oss-cn-qingdao.aliyuncs.com
    'ossServerInternal' => env('OSS_SERVER_INTERNAL', 'http://服务器内网地址'), //青岛为 http://oss-cn-qingdao-internal.aliyuncs.com
    'AccessKeyId' => env('OSS_ACCESS_KEY_ID', '阿里云给的AccessKeyId'),
    'AccessKeySecret' => env('OSS_ACCESS_KEY_SECRET', '阿里云给的AccessKeySecret'),
    'ossBucket' => env('OSS_BUCKET'),
    'ossUseInternal' => env('OSS_USE_INTERNAL', true),

];
