<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use App\Events\LeadCreated;
use Illuminate\Http\Request;
use App\Models\FollowUp;
use App\Models\Project;
use Inertia\Inertia;

class LeadController extends Controller
{
    /** 
     * Display list of leads 
     */
    public function index()
    {
        // Load agent + project relationship
        $leads = Lead::with([
            'assignedTo:id,name',
            'project:id,name'   // ⭐ Load project here
        ])->latest()->paginate(10);

        $users = User::role('Agent')->get(['id', 'name']);
        $projects = Project::get(['id', 'name']);

        $leads->getCollection()->transform(function ($lead) {
            return [
                'id' => $lead->id,
                'name' => $lead->name,
                'email' => $lead->email,
                'phone' => $lead->phone,
                'status' => $lead->status,

                'project_id' => $lead->project_id,
                'project' => $lead->project ? [
                    'id' => $lead->project->id,
                    'name' => $lead->project->name,
                ] : null,

                'assigned_to' => $lead->assigned_to,
                'assignedTo' => $lead->assignedTo ? [
                    'id' => $lead->assignedTo->id,
                    'name' => $lead->assignedTo->name,
                ] : null,
            ];
        });

        return inertia('Leads/Index', [
            'leads' => $leads,
            'users' => $users,
            'projects' => $projects,
            'flash' => session()->only(['success']),
        ]);
    }

    /** 
     * Show create form 
     */
    public function create()
    {
        $users = User::role('Agent')->get(['id', 'name']);
        $projects = Project::get(['id', 'name']);

        return Inertia::render('Leads/Create', [
            'users' => $users,
            'projects' => $projects,
        ]);
    }

    /** 
     * Store new lead 
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email',
            'phone'       => 'nullable|string|max:20',
            'status'      => 'required|string',
            'notes'       => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        $data['owner_id'] = auth()->id();

        $lead = Lead::create($data);

        // 🔥 Fire real-time notification to Reverb
        broadcast(new LeadCreated($lead))->toOthers();

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    /** 
     * Show single lead with follow-ups 
     */
    public function show($id)
    {
        $lead = Lead::with([
            'assignedTo:id,name',
            'project:id,name',
            'owner:id,name'
        ])->findOrFail($id);

        $leadTransformed = [
            'id' => $lead->id,
            'name' => $lead->name,
            'email' => $lead->email,
            'phone' => $lead->phone,
            'status' => $lead->status,
            'notes' => $lead->notes,

            'owner' => $lead->owner ? [
                'id' => $lead->owner->id,
                'name' => $lead->owner->name,
            ] : null,

            'project_id' => $lead->project_id,
            'project' => $lead->project ? [
                'id' => $lead->project->id,
                'name' => $lead->project->name,
            ] : null,

            'assigned_to' => $lead->assigned_to,
            'assignedTo' => $lead->assignedTo ? [
                'id' => $lead->assignedTo->id,
                'name' => $lead->assignedTo->name,
            ] : null,
        ];

        // Followups with user
        $followups = FollowUp::with('user:id,name')
            ->where('lead_id', $id)
            ->orderByDesc('followup_at')
            ->get();

        return Inertia::render('Leads/Show', [
            'lead' => $leadTransformed,
            'followups' => $followups,
        ]);
    }



    /** 
     * Show edit form 
     */
    public function edit(Lead $lead)
    {
        $users = User::role('Agent')->get(['id', 'name']);
        $projects = Project::get(['id', 'name']);

        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'users' => $users,
            'projects' => $projects,
        ]);
    }

    /** 
     * Update existing lead 
     */
    public function update(Request $request, Lead $lead)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email',
            'phone'       => 'nullable|string|max:20',
            'status'      => 'required|string',
            'notes'       => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'project_id' => 'nullable|exists:projects,id',
        ]);

        $lead->update($data);

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    /** 
     * Assign an agent to a lead (used by dropdown in index table) 
     */
    public function assign(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $lead->update(['assigned_to' => $validated['assigned_to']]);

        $lead->load('assignedTo:id,name');

        return response()->json([
            'success' => true,
            'lead' => [
                'id' => $lead->id,
                'assigned_to' => $lead->assigned_to,
                'assignedTo' => $lead->assignedTo ? [
                    'id' => $lead->assignedTo->id,
                    'name' => $lead->assignedTo->name,
                ] : null,
            ],
        ]);
    }

    /** 
     * Delete a lead (permission protected)
     */
    public function destroy(Lead $lead)
    {
        if (!auth()->user()->hasPermissionTo('delete leads')) {
            abort(403, 'You are not allowed to delete leads.');
        }

        $lead->delete();
        return redirect()->back()->with('success', 'Lead deleted successfully.');
    }
}
