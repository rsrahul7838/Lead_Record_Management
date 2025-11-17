<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Message;
use App\Events\NewMessage;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Lead $lead)
    {
        return Message::where('lead_id', $lead->id)
            ->with('user:id,name')
            ->orderBy('id')
            ->get();
    }

    public function store(Request $request, Lead $lead)
    {
        $msg = Message::create([
            'lead_id' => $lead->id,
            'user_id' => auth()->id(),
            'message' => $request->message
        ]);

        broadcast(new NewMessage($msg->load('user')))->toOthers();

        return $msg;
    }
}
