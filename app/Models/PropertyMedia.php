<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyMedia extends Model
{
    use HasFactory;

    protected $fillable = ['property_id','type','path','filename'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function getUrlAttribute()
    {
        return $this->path ? asset('storage/' . $this->path) : null;
    }
}
