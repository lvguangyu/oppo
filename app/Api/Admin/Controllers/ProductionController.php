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
        $res = Production::create(['user_id' => 1, 'is_up_wall' => 1, 'shown_wall' => 1, 'url' => $request->get('url')]);
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
        $zip = new \ZipArchive();
        $tmp_file = storage_path('app/pack.zip');
        $productions = Production::all();

        if ($zip->open($tmp_file,  \ZipArchive::CREATE)) {
            foreach ($productions as $production) {
                $tmp = file_put_contents(storage_path('app/'.$production->id.'.png'), file_get_contents($production->url));
                $zip->addFile($tmp, $production->id . '.png');
            }
            $zip->close();
            echo 'Archive created!';
            header('Content-disposition: attachment; filename=pack.zip');
            header('Content-type: application/zip');
            ob_clean();
            flush();
            readfile($tmp_file);
        } else {
            echo 'Failed!';
        }
    }
}
