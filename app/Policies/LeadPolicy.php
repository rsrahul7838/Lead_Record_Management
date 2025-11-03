<?php

namespace App\Policies;

use App\Models\Lead;
use App\Models\User;

class LeadPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasAnyRole(['Admin', 'Project Manager', 'Sales']);
    }

    public function view(User $user, Lead $lead)
    {
        return $user->hasRole('Admin')
            || $user->hasRole('Project Manager')
            || $lead->assigned_to === $user->id;
    }

    public function create(User $user)
    {
        return $user->hasAnyRole(['Admin', 'Project Manager']);
    }

    public function update(User $user, Lead $lead)
    {
        return $user->hasRole('Admin')
            || ($user->hasRole('Project Manager'))
            || $lead->assigned_to === $user->id;
    }

    public function delete(User $user, Lead $lead)
    {
        return $user->hasRole('Admin');
    }
}
