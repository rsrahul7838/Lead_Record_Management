<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Models\Lead;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // You can replace with real data later
        $totalProjects = Project::count();
        $totalLeads = Lead::count();
        $activeProjects = Project::where('status', 'active')->count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalProjects' => $totalProjects,
                'activeProjects' => $activeProjects,
                'totalLeads' => $totalLeads,
            ]
        ]);
    }
}
