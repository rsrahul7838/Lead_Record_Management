<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'budget', 'preferred_location',
        'assigned_agent_id', 'notes', 'next_followup_date',
    ];

    public function leads()
    {
        return $this->hasMany(Lead::class);
    }

    public function agent()
    {
        return $this->belongsTo(User::class, 'assigned_agent_id');
    }
}
