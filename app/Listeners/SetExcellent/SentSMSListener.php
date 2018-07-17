<?php

namespace App\Listeners\SetExcellent;

use App\Events\SetExcellent;
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
     * @param  SetExcellent  $event
     * @return void
     */
    public function handle(SetExcellent $event)
    {
        $user = $event->user;
        $this->sms->send($user->mobile, $this->smsName, [], 'SMS_138077710');
    }
}
