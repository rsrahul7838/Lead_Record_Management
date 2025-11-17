<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class NewMessage implements ShouldBroadcast
{
    use SerializesModels;

    public $data;

    public function __construct(Message $msg)
    {
        $this->data = [
            'id' => $msg->id,
            'lead_id' => $msg->lead_id,
            'user' => [
                'id' => $msg->user->id,
                'name' => $msg->user->name
            ],
            'message' => $msg->message,
            'created_at' => $msg->created_at->toDateTimeString(),
        ];
    }

    public function broadcastOn()
    {
        return new PrivateChannel('lead.' . $this->data['lead_id']);
    }

    public function broadcastAs()
    {
        return 'NewMessage';
    }
}
