<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Lead;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // $this->middleware('auth');

        // ✅ Fetch Stats
        $projectCount = Project::count();
        $leadCount = Lead::count();

        // ✅ Lead status summary
        $leadStatusSummary = Lead::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        // ✅ Recent Projects
        $recentProjects = Project::latest()->take(5)->get(['id', 'name', 'status', 'created_at']);

        // ✅ Recent Leads
        $recentLeads = Lead::latest()->take(5)->get(['id', 'name', 'email', 'status', 'created_at']);

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'projects' => $projectCount,
                'leads' => $leadCount,
            ],
            'leadStatusSummary' => $leadStatusSummary,
            'recentProjects' => $recentProjects,
            'recentLeads' => $recentLeads,
        ]);
    }
}
