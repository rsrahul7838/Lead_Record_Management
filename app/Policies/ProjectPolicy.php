<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasAnyRole(['Admin', 'Project Manager']);
    }

    public function view(User $user, Project $project)
    {
        return $user->hasAnyRole(['Admin', 'Project Manager']) || $project->owner_id === $user->id;
    }

    public function create(User $user)
    {
        return $user->hasAnyRole(['Admin', 'Project Manager']);
    }

    public function update(User $user, Project $project)
    {
        return $user->hasRole('Admin') || $project->owner_id === $user->id;
    }

    public function delete(User $user, Project $project)
    {
        return $user->hasRole('Admin');
    }
}
