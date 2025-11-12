<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Lead;
use App\Models\Property;
use App\Models\User;

class AgentController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = auth()->user();

        // 👇 Default: show current user's data
        $agentId = $request->get('agent_id', $user->id);

        // ✅ If admin logged in, allow viewing any agent
        if ($user->hasRole('Super Admin')) {
            $agents = User::role('Agent')->select('id', 'name')->get();
        } else {
            $agents = collect([$user]); // only self
        }

        $myLeads = Lead::where('assigned_to', $agentId)
            ->with('project:id,name,location,price')
            ->latest()
            ->take(10)
            ->get();

        $myProperties = Property::where('assigned_agent_id', $agentId)
            ->latest()
            ->take(10)
            ->get();

        $totalLeads = $myLeads->count();
        $totalSold = $myProperties->where('status', 'Sold')->count();
        $target = 20;
        $progress = $target ? round(($totalSold / $target) * 100) : 0;

        return Inertia::render('Agent/Index', [
            'user' => $user,
            'agents' => $agents,
            'selectedAgentId' => $agentId,
            'myLeads' => $myLeads,
            'myProperties' => $myProperties,
            'stats' => compact('totalLeads', 'totalSold', 'target', 'progress'),
        ]);
    }
}
