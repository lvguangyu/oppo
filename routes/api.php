<?php

//use Illuminate\Http\Request;
//
///*
//|--------------------------------------------------------------------------
//| API Routes
//|--------------------------------------------------------------------------
//|
//| Here is where you can register API routes for your application. These
//| routes are loaded by the RouteServiceProvider within a group which
//| is assigned the "api" middleware group. Enjoy building your API!
//|
//*/
//
//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['middleware' => ['cross']], function ($api) {
    //admin
    $api->group([
        'namespace' => 'App\Api\Admin\Controllers',
        'prefix' => 'admin'
    ], function ($api){
        //上传图片
        $api->any('oss/upload', 'UploadController@single_image_to_oss');

        //登录
        $api->post('login', 'UserController@login');
        $api->group([
            'middleware' => ['jwt.auth', 'jwt.refresh']
        ], function ($api) {
            $api->post('logout', 'UserController@logout');
        });

        //当前用户
        $api->group(['prefix' => 'user', 'middleware' => 'jwt.auth'], function ($api) {
            //获取管理员信息
            $api->get('info', 'UserController@info');
        });

        $api->get('productions/export', 'ProductionController@export');
        $api->get('productions/export_image', 'ProductionController@export_image');

        $api->get('winner/wall/export', 'WinnerController@export_wall');
        $api->get('winner/excellent/export', 'WinnerController@export_excellent');

        $api->group(['middleware' => 'jwt.auth'], function ($api){
            $api->resource('productions', 'ProductionController');
            $api->resource('awards', 'AwardController');
            $api->resource('comments', 'CommentController');
            $api->delete('words', 'WordController@destroy');
            $api->resource('words', 'WordController');

            $api->get('winner/wall', 'WinnerController@wall');
            $api->get('winner/excellent', 'WinnerController@excellent');
        });

        //通过所有option请求
        $api->options('{slug}', 'BaseController@option')->where('slug', '.*');
    });

    //front end
    $api->group([
        'namespace' => 'App\Api\Controllers',
        'middleware' => 'cross'
    ], function ($api){
        $api->any('send_code', 'SendCodeController@send_code');
        $api->any('validate_code', 'SendCodeController@validate_code');
        $api->any('wechat_config', 'WechatController@api_config');
        $api->any('oss/upload', 'UploadController@single_data_to_oss');
        $api->post('user/login', 'UserController@login');

        $api->group(['middleware' => 'jwt.auth'], function ($api) {
            $api->get('user/info', 'UserController@show');

            $api->post('production', 'ProductionController@store');
            $api->get('wall/production', 'ProductionController@wall');
            $api->get('excellent/production', 'ProductionController@excellent');
            $api->post('praise/wall/production', 'ProductionController@wall_praise');
            $api->post('dispraise/wall/production', 'ProductionController@wall_dispraise');

            $api->post('production/vote', 'ProductionController@vote');
            $api->post('excellent/draw', 'AwardController@excellent_draw');
            $api->get('excellent/winners', 'AwardController@excellent_winners');
            $api->get('excellent/awards/mine', 'AwardController@excellent_mine');
            $api->post('excellent/submit', 'WinnerController@store');
            $api->put('excellent/submit', 'WinnerController@update');

            $api->post('comment', 'CommentController@store');
            $api->get('comments', 'CommentController@index');
            $api->get('awards', 'AwardController@index');
            $api->get('wall/winners', 'AwardController@wall_winners');
            $api->post('wall/draw', 'AwardController@wall_draw');
            $api->get('wall/awards/mine', 'AwardController@wall_mine');
            $api->post('wall/submit', 'WinnerController@store');
            $api->put('wall/submit', 'WinnerController@update');
        });

        $api->group(['prefix' => 'users'], function ($api) {
            $api->any('oauth', 'WechatController@oauth');

            $api->group([
                'middleware' => ['jwt.auth', 'jwt.refresh']
            ], function ($api) {
                $api->get('refresh', 'UserController@refresh');
            });

            $api->group([
                'middleware' => ['jwt.auth']
            ], function ($api) {
                $api->get('', 'UserController@show');
            });
        });

        //通过所有option请求
        $api->options('{slug}', 'BaseController@option')->where('slug', '.*');
    });
});