<?php

namespace App\Api\Controllers;

use App\Api\Transformers\ProductionTransformer;
use App\Api\Transformers\WallProductionTransformer;
use App\Production;
use App\User;
use Illuminate\Http\Request;

class ProductionController extends BaseController
{
    public function store(Request $request)
    {
        $user = $this->getApiBaseUser();

        try {
            $ex = \DB::transaction(function () use ($request, $user) {
                $user->update([
                    'name' => $request->get('oppo_id'),
                    'mobile' => $request->get('mobile'),
                ]);

                $user->production()->updateOrCreate($request->only(['url', 'is_up_wall']));
            });

            \Log::error(json_encode($ex));

            if (is_null($ex)) {
                return $this->responseSuccess();
            }

            return $this->responseFailed();

        } catch (\Exception $e) {
            \Log::error(json_encode($e));
            return $this->responseFailed();
        }
    }

    public function wall()
    {
        $list = Production::where('shown_wall', 1)->latest()->get();
        return $this->response->collection($list, new WallProductionTransformer());
    }

    public function excellent()
    {
        $list = Production::where('excellent', 1)->latest()->get();
        return $this->response->collection($list, new ProductionTransformer());
    }

    public function wall_praise(Request $request)
    {
        $user = $this->getApiBaseUser();
        $res = $user->likes()->create(['production_id' => $request->get('id')]);
        return $res ? $this->responseSuccess(['data' => ['b1_draw_count' => $user->b1_draw_count, 'b1_praised' => $user->b1_praised]]) : $this->responseFailed();
    }

    public function wall_dispraise(Request $request)
    {
        $user = $this->getApiBaseUser();
        $res = $user->likes()->where('production_id', $request->get('id'))->where('created_at', 'LIKE', date('Y-m-d') . '%')->delete();
        return $res ? $this->responseSuccess(['data' => ['b1_draw_count' => $user->b1_draw_count, 'b1_praised' => $user->b1_praised]]) : $this->responseFailed();
    }

    public function vote(Request $request)
    {
        $user = $this->getApiBaseUser();

        $ids = $request->get('ids');
        foreach ($ids as $id) {
            $user->votes()->create(['production_id' => $id]);
        }

        return $this->responseSuccess(['data' => ['a1_draw_count' => $user->a1_draw_count, 'a1_voted' => $user->a1_voted]]);
    }
}
