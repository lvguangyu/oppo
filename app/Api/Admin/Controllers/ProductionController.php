<?php

namespace App\Api\Admin\Controllers;

use App\Api\Admin\Transformers\ProductionTransformer;
use App\Events\SetExcellent;
use App\Events\ShownWall;
use App\Production;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class ProductionController extends BaseController
{
    public function index(Request $request)
    {
        $list = Production::latest();

        if($request->get('type') === 'up_wall'){
            $list = $list->where('is_up_wall', 1);
        }

        if($request->exists('is_admin_upload')){
            $list = $list->where('is_admin_upload', $request->get('is_admin_upload'));
        }

        $list = $list->paginate($this->limit);
        return $this->response->paginator($list, new ProductionTransformer());
    }

    public function update($id, Request $request)
    {
        $production = Production::find($id);
        $res = $production->update($request->all());
        if($res && intval($request->get('shown_wall')) === 1){
            //展示在告白墙
            event(new ShownWall($production->user, $production));
        }

        if($res && intval($request->get('excellent')) === 1){
            //设为优秀作品
            event(new SetExcellent($production->user, $production));
        }


        return $this->autoResponse($res);
    }

    public function store(Request $request)
    {
        $res = Production::create(['user_id' => 1, 'is_up_wall' => 1, 'shown_wall' => 1, 'url' => $request->get('url'), 'is_admin_upload' => $request->get('is_admin_upload', 0)]);
        return $this->autoResponse($res);
    }

    public function export(Request $request)
    {
        $name = '字稿征集列表';
        \Excel::create(date('Ymd-His') . ' ' . $name, function ($excel) use ($name){
            $excel->sheet($name, function ($sheet) {
                $all = Production::latest()->get();

                $data = [
                    ['作者OPPO ID', '作者手机号码', '作品ID', '是否参与告白墙']
                ];
                foreach ($all as $each){
                    $data[] = [
                        $each->user->oppo_id,
                        $each->user->mobile,
                        $each->id,
                        $each->is_show_wall ? '是' : '否',
                    ];
                }

                $sheet->fromArray($data, null, 'A1', false, false);
            });
        })->export('xls');
    }

    public function export_image()
    {
        $filename = str_replace('\\', '/', storage_path()) . '/app/作品图片_' . date('YmdHis') . '.zip';
        $zip = new \ZipArchive (); // 使用本类，linux需开启zlib，windows需取消php_zip.dll前的注释
        if ($zip->open($filename, \ZIPARCHIVE::CREATE) !== TRUE) {
            exit ('无法打开文件，或者文件创建失败');
        }

        $productions = Production::all();
        foreach ($productions as $production) {
            $tmpName = storage_path('app/'.$production->id.'.png');
            file_put_contents($tmpName, file_get_contents($production->url));
            $zip->addFile($tmpName, $production->user->oppo_id.'_'.$production->id . '.png');
        }

        $zip->close(); // 关闭
        ////下面是输出下载;
        header("Cache-Control: max-age=0");
        header("Content-Description: File Transfer");
        header('Content-disposition: attachment; filename=' . basename($filename)); // 文件名
        header("Content-Type: application/zip"); // zip格式的
        header("Content-Transfer-Encoding: binary"); // 告诉浏览器，这是二进制文件
        header('Content-Length: ' . filesize($filename)); // 告诉浏览器，文件大小
        @readfile($filename);//输出文件;
    }
}
