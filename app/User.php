<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Ultraware\Roles\Traits\HasRoleAndPermission;

class User extends Authenticatable
{
    use Notifiable, HasRoleAndPermission;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'oppo_id', 'password', 'mobile'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public function production()
    {
        return $this->hasMany('App\Production');
    }

    public function likes()
    {
        return $this->hasMany('App\Like');
    }

    public function votes()
    {
        return $this->hasMany('App\Vote');
    }
    
    public function winners()
    {
        return $this->hasMany('App\Winner');
    }

    public function draws()
    {
        return $this->hasMany('App\Draw');
    }

    public function getB1PraisedAttribute()
    {
        return $this->draws()->where('created_at', 'LIKE', date('Y-m-d').'%')->where('type', 'B')->exists();
    }
    
    public function getB1DrawCountAttribute()
    {
        $praised = Like::where('user_id', $this->id)->where('created_at', 'LIKE', date('Y-m-d').'%')->exists();
        if(!$praised) {
            return 0;
        }

        $count = 3 - $this->draws()->where('created_at', 'LIKE', date('Y-m-d').'%')->where('type', 'B')->count();

        return $count > 0 ? $count : 0;
    }

    public function getA1VotedAttribute()
    {
        return $this->draws()->where('created_at', 'LIKE', date('Y-m-d').'%')->where('type', 'A')->exists();
    }

    public function getA1DrawCountAttribute()
    {
        $voted = Vote::where('user_id', $this->id)->where('created_at', 'LIKE', date('Y-m-d').'%')->exists();
        if(!$voted) {
            return 0;
        }

        return 1 - $this->draws()->where('created_at', 'LIKE', date('Y-m-d').'%')->where('type', 'A')->count();
    }

    public static function getUserByWechat($wechat)
    {
        if(!isset($wechat['id'])){
            return null;
        }

        $user = self::where('openid', $wechat['id'])->first();
        if(!$user) {
            $user = self::create([
                'name' => $wechat['name'],
                'email' => $wechat['email']?:'',
                'company' => '',
                'password' => bcrypt(env('APP_NAME')),
                'avatar' => $wechat['avatar'],
                'nickname' => $wechat['nickname'],
                'gender' => $wechat['original']['sex'],
                'province' => $wechat['original']['province'],
                'city' => $wechat['original']['city'],
                'cellphone' => $wechat['id'],
                'openid' => $wechat['id'],
                'unionid' => $wechat['unionid'] ?: ''
            ]);
        }

        return $user;
    }
}
