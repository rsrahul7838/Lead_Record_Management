<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'notes',
        'owner_id',
        'assigned_to',
        'project_id',
    ];

    public function owner()
    {
        // return $this->belongsTo(User::class, 'owner_id');
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }
    public function followups()
    {
        return $this->hasMany(\App\Models\FollowUp::class);
    }
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
