<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Lead;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalProjects' => Project::count(),
            'activeProjects' => Project::where('status', 'Active')->count(),
            'totalLeads' => Lead::count(),
            'totalUsers' => User::count(),
        ];

        $recentProjects = Project::latest()->take(5)->get(['id', 'name', 'status', 'created_at']);
        $recentLeads = Lead::latest()->take(5)->get(['id', 'name', 'email', 'status', 'created_at']);

        $leadStatusSummary = Lead::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'leadStatusSummary' => $leadStatusSummary,
            'recentProjects' => $recentProjects,
            'recentLeads' => $recentLeads,
        ]);
    }
}
