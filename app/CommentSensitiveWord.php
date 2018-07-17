<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentSensitiveWord extends Model
{
    protected $fillable = ['content'];

    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
