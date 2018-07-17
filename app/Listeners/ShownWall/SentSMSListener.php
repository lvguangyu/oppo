<?php

namespace App\Listeners\ShownWall;

use App\Events\ShownWall;
use App\Services\Alidysms;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SentSMSListener
{
    public $sms;
    private $smsName = '陈德贤';

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        $this->sms = new Alidysms();
    }

    /**
     * Handle the event.
     *
     * @param  ShownWall  $event
     * @return void
     */
    public function handle(ShownWall $event)
    {
        $user = $event->user;
        try{
            $this->sms->send($user->mobile, '', [], 'SMS_138072732');
        }catch (\Exception $e) {
            \Log::error(json_encode($e));
        }
    }
}
