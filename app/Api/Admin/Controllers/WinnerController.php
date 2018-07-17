<?php

namespace App\Api\Admin\Controllers;

use App\Api\Admin\Transformers\WinnerTransformer;
use App\Winner;
use Illuminate\Http\Request;

class WinnerController extends BaseController
{
    public function wall(Request $request)
    {
        $list = Winner::latest()->whereHas('award', function ($sql){
            return $sql->where('type', 'B');
        });
        $list = $list->paginate($this->limit);
        return $this->response->paginator($list, new WinnerTransformer());
    }

    public function excellent(Request $request)
    {
        $list = Winner::latest()->whereHas('award', function ($sql){
            return $sql->where('type', 'A');
        });
        $list = $list->paginate($this->limit);
        return $this->response->paginator($list, new WinnerTransformer());
    }

    public function export_wall(Request $request)
    {
        $name = '字稿征集告白墙抽奖结果';
        \Excel::create(date('Ymd-His') . ' ' . $name, function ($excel) use ($name){
            $excel->sheet($name, function ($sheet) {
                $all = Winner::latest()->whereHas('award', function ($sql){
                    return $sql->where('type', 'B');
                })->get();

                $data = [
                    ['OPPO 账号', 'OPPO ID', '手机号码', '获奖时间', '获得作品', '活动类型']
                ];
                foreach ($all as $item){
                    $data[] = [
                        $item->username,
                        $item->user->oppo_id,
                        $item->mobile2 ?: $item->mobile,
                        $item->created_at->toDateTimeString(),
                        $item->award->desc,
                        $item->award->type==='A'?'作品投票':'告白墙'
                    ];
                }

                $sheet->fromArray($data, null, 'A1', false, false);
            });
        })->export('xls');
    }

    public function export_excellent(Request $request)
    {
        $name = '字稿征集作品投票抽奖结果';
        \Excel::create(date('Ymd-His') . ' ' . $name, function ($excel) use ($name){
            $excel->sheet($name, function ($sheet) {
                $all = Winner::latest()->whereHas('award', function ($sql){
                    return $sql->where('type', 'A');
                })->get();

                $data = [
                    ['OPPO 账号', 'OPPO ID', '手机号码', '获奖时间', '获得作品', '活动类型']
                ];
                foreach ($all as $item){
                    $data[] = [
                        $item->username,
                        $item->user->oppo_id,
                        $item->mobile2 ?: $item->mobile,
                        $item->created_at->toDateTimeString(),
                        $item->award->desc,
                        $item->award->type==='A'?'作品投票':'告白墙'
                    ];
                }

                $sheet->fromArray($data, null, 'A1', false, false);
            });
        })->export('xls');
    }
}
