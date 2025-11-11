<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Lead;
use App\Models\User;
use App\Models\FollowUp; 
use Illuminate\Support\Carbon; 
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // ✅ Get upcoming (today’s) follow-ups
        $nextFollowUps = FollowUp::with(['lead', 'client', 'user'])
            ->whereDate('followup_at', $today)
            ->where('done', false)
            ->orderBy('followup_at')
            ->get();

        // ✅ Your existing dashboard stats remain the same
        $stats = [
            'totalProjects' => Project::count(),
            'activeProjects' => Project::where('status', 'Active')->count(),
            'totalLeads' => Lead::count(),
            'totalUsers' => User::count(),
        ];

        // ✅ Existing queries preserved
        $recentProjects = Project::latest()->take(5)->get(['id', 'name', 'status', 'created_at']);
        $recentLeads = Lead::latest()->take(5)->get(['id', 'name', 'email', 'status', 'created_at']);

        // ✅ Lead status summary chart
        $leadStatusSummary = Lead::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        // ✅ Combine everything in one Inertia render
        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'leadStatusSummary' => $leadStatusSummary,
            'recentProjects' => $recentProjects,
            'recentLeads' => $recentLeads,
            'nextFollowUps' => $nextFollowUps,
        ]);
    }
}
