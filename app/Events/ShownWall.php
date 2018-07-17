<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ShownWall
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $production;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $production)
    {
        $this->user = $user;
        $this->production = $production;
    }
}
