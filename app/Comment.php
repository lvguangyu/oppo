<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'user_id', 'content', 'deleted', 'public'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
    
    public function getFilteredContentAttribute()
    {
        $contents = CommentSensitiveWord::all()->pluck('content')->toArray();
        foreach ($contents as $word){
            $this->content = str_replace($word, '**', $this->content);
        }
        return $this->content;
    }
}
