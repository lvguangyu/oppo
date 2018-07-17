<?php
/**
 * Created by PhpStorm.
 * User: desand
 * Date: 16/5/26
 * Time: 下午3:42
 */

namespace App\Format;

use Dingo\Api\Http\Response;
use Dingo\Api\Http\Response\Format\Json as DingoJson;
use Illuminate\Support\Str;

class Json extends DingoJson
{
    /**
     * Format an Eloquent model.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     *
     * @return string
     */
    public function formatEloquentModel($model)
    {
        $key = Str::singular($model->getTable());

        if (! $model::$snakeAttributes) {
            $key = Str::camel($key);
        }

        return $this->encode([$key => $model->toArray()]);
    }

    /**
     * Format an Eloquent collection.
     *
     * @param \Illuminate\Database\Eloquent\Collection $collection
     *
     * @return string
     */
    public function formatEloquentCollection($collection)
    {
        if ($collection->isEmpty()) {
            return $this->encode([]);
        }

        $model = $collection->first();
        $key = Str::plural($model->getTable());

        if (! $model::$snakeAttributes) {
            $key = Str::camel($key);
        }

        return $this->encode([$key => $collection->toArray()]);
    }

    /**
     * Format an array or instance implementing Arrayable.
     *
     * @param array|\Illuminate\Contracts\Support\Arrayable $content
     *
     * @return string
     */
    public function formatArray($content)
    {
        $content = $this->morphToArray($content);

        array_walk_recursive($content, function (&$value) {
            $value = $this->morphToArray($value);
        });

        return $this->encode($content);
    }

    /**
     * Get the response content type.
     *
     * @return string
     */
    public function getContentType()
    {
        return 'application/json';
    }

    /**
     * Encode the content to its JSON representation.
     *
     * @param string $content
     *
     * @return string
     */
    protected function encode($content)
    {
        $content = $this->format($content);

        return json_encode($content);
    }

    private function format($content)
    {
        if(is_null($this->response)){
            $this->response = new Response($content);
        }

        $content['code'] = isset($content['code'])  ? $content['code'] : $this->response->getStatusCode();
        if(!isset($content['message']))
        {
            $content['message'] = $content['code'] == 200 ? 'Success' : 'Failed';
        }

        if(isset($content['meta']))
        {
            $meta = $content['meta'];
            unset($content['meta']);
            $content = array_merge($content, $meta);
        }

        $key = 'pagination';
        if(isset($content[$key])){
            $content['data'] = [
                'list' => $content['data'],
                $key => $content[$key]
            ];
            unset($content[$key]);
        }

        return $content;
    }

}