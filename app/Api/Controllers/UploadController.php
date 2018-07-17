<?php

namespace App\Api\Controllers;

use App\Services\OSS;
use Illuminate\Http\Request;

class UploadController extends BaseController
{
    public function single_image_to_oss(Request $request)
    {
        if ($this->simpleValidator($request, [
                'file' => 'required',
            ]) !== true
        ) {
            return $this->getValidateErrors();
        }

        $res = (new OSS())->upload_single_image($request->file('file'));

        return $this->autoResponse(
            $res, $res
        );
    }
    
    public function single_data_to_oss(Request $request)
    {
        if ($this->simpleValidator($request, [
                'data' => 'required',
            ]) !== true
        ) {
            return $this->getValidateErrors();
        }

        $res = (new OSS())->upload_single_data($request->get('data'));

        return $this->autoResponse(
            $res, $res
        );
    }

    public function multi_image_to_oss(Request $request)
    {
        $res = (new OSS())->upload_single_image($request->file('files'));

        return $this->autoResponse(
            $res, $res
        );
    }
}
