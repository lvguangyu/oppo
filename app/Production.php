<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Production extends Model
{
    protected $fillable = [
        'url', 'is_up_wall', 'is_show', 'shown_wall', 'user_id', 'excellent', 'is_admin_upload'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function likes()
    {
        return $this->hasMany('App\Like');
    }

    public function votes()
    {
        return $this->hasMany('App\Vote');
    }

    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function getPraisedAttribute()
    {
        $user = null;
        try {
            $user = app('Dingo\Api\Auth\Auth')->user();
        }catch (\Exception $e) {
            \Log::error(json_encode($e));
        }

        if (!$user) {
            return false;
        }

        return $this->likes()->where('user_id', $user->id)->where('created_at', 'LIKE', date('Y-m-d') . '%')->exists();
    }

    public function getVotedAttribute()
    {
        $user = null;
        try {
            $user = app('Dingo\Api\Auth\Auth')->user();
        }catch (\Exception $e) {
            \Log::error(json_encode($e));
        }

        if (!$user) {
            return false;
        }

        return $this->votes()->where('user_id', $user->id)->where('created_at', 'LIKE', date('Y-m-d') . '%')->exists();
    }
}
