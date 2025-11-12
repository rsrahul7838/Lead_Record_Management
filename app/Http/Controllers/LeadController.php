<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\FollowUp;
use Inertia\Inertia;

class LeadController extends Controller
{
    /** 
     * Display list of leads 
     */
    public function index()
    {
        // Load assigned agent relationship
        $leads = Lead::with('assignedTo:id,name')->latest()->paginate(10);
        $users = User::role('Agent')->get(['id', 'name']);

        // ✅ Use transform() to explicitly keep relationships
        $leads->getCollection()->transform(function ($lead) {
            return [
                'id' => $lead->id,
                'name' => $lead->name,
                'email' => $lead->email,
                'phone' => $lead->phone,
                'status' => $lead->status,
                'assigned_to' => $lead->assigned_to,
                'assignedTo' => $lead->assignedTo ? [
                    'id' => $lead->assignedTo->id,
                    'name' => $lead->assignedTo->name,
                ] : null,
            ];
        });

        return inertia('Leads/Index', [
            // ✅ Pass full paginator (not ->items()), so relationships are kept
            'leads' => $leads,
            'users' => $users,
            'flash' => session()->only(['success']),
        ]);
    }
    /** 
     * Show create form 
     */
    public function create()
    {
        $users = User::role('Agent')->get(['id', 'name']); 

        return Inertia::render('Leads/Create', [
            'users' => $users,
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
        ]);

        $data['owner_id'] = auth()->id();

        Lead::create($data);

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    /** 
     * Show single lead with follow-ups 
     */
    public function show($id)
    {
        $lead = Lead::with('owner')->findOrFail($id);

        $followups = FollowUp::with('user')
            ->where('lead_id', $id)
            ->orderByDesc('followup_at')
            ->get();

        return Inertia::render('Leads/Show', [
            'lead' => $lead,
            'followups' => $followups,
        ]);
    }

    /** 
     * Show edit form 
     */
    public function edit(Lead $lead)
    {
        $users = User::role('Agent')->get(['id', 'name']); // ✅ for agent dropdown

        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'users' => $users,
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
            'assigned_to' => 'nullable|exists:users,id', // ✅ ensure valid agent id
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
