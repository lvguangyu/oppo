<?php

namespace App\Api\Controllers;

use App\Api\Transformers\AwardTransformer;
use App\Api\Transformers\WinnerTransformer;
use App\Award;
use App\Draw;
use App\User;
use App\Winner;
use Illuminate\Http\Request;

class AwardController extends BaseController
{
    public function index(Request $request)
    {
        $list = Award::limit(5)->where('type', 'B')->get();
        return $this->response->collection($list, new AwardTransformer());
    }

    public function wall_winners()
    {
        $list = Winner::limit(200)->whereHas('award', function ($sql){
            $sql->where('type', 'B');
        })->latest()->get();
        return $this->response->collection($list, new WinnerTransformer());
    }
    
    public function excellent_winners()
    {
        $list = Winner::limit(200)->whereHas('award', function ($sql){
            $sql->where('type', 'A');
        })->latest()->get();
        return $this->response->collection($list, new WinnerTransformer());
    }

    public function wall_draw(Request $request)
    {
        $user = $this->getApiBaseUser();
        $list = Award::limit(5)->where('type', 'B')->get();

        Draw::create([
            'user_id' => $user->id,
            'type' => 'B'
        ]);

        $min = 0;
        $max = 5000000;
        $salt = random_int($min, $max);

        $winner = false;

        foreach ($list as $row) {
            if ($salt >= $min && $salt < $row->total + $min) {
                //winner
                $winner = Winner::create([
                    'user_id' => $user->id,
                    'award_id' => $row->id,
                    'award_title' => $row->title,
                    'mobile' => $user->mobile
                ]);

                break;
            }

            $min += $row->tatal;
        }

        return $this->responseSuccess(['data' => ['winner' => $winner, 'b1_draw_count' => $user->b1_draw_count]]);
    }
    
    public function excellent_draw(Request $request)
    {
        $user = $this->getApiBaseUser();

        Draw::create([
            'user_id' => $user->id,
            'type' => 'A'
        ]);

        $list = Award::limit(5)->where('type', 'A')->get();

        $min = 0;
        $max = 5000000;
        $salt = random_int($min, $max);

        $winner = false;
        $item = 4;

        foreach ($list as $i => $row) {
            if ($salt >= $min && $salt < $row->total + $min) {
                //winner
                $winner = Winner::create([
                    'user_id' => $user->id,
                    'award_id' => $row->id,
                    'mobile' => $user->mobile
                ]);

                $item = $i;

                break;
            }

            $min += $row->tatal;
        }

        return $this->responseSuccess(['data' => ['a1_draw_count' => $user->a1_draw_count, 'a1_voted' => $user->a1_voted, 'item' => $item+1, 'winner' => $winner]]);
    }

    public function wall_mine()
    {
        $user = $this->getApiBaseUser();

        $awards = Award::limit(5)->where('type', 'B')->get();
        $ids = $awards->pluck('id');

        $list = $user->winners()->whereIn('award_id', $ids)->get();
        return $this->response->collection($list, new WinnerTransformer());
    }

    public function excellent_mine()
    {
        $user = $this->getApiBaseUser();

        $awards = Award::limit(5)->where('type', 'A')->get();
        $ids = $awards->pluck('id');

        $list = $user->winners()->whereIn('award_id', $ids)->get();
        return $this->response->collection($list, new WinnerTransformer());
    }
}
