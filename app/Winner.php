<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    protected $fillable = [
        'user_id', 'award_id', 'mobile', 'username', 'address', 'mobile2', 'name'
    ];

    public function award()
    {
        return $this->belongsTo('App\Award');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
