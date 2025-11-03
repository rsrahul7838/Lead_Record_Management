<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->authorizeResource(Lead::class, 'lead');
    }

    public function index(Request $request)
    {
        $query = Lead::with(['project', 'assignedUser'])
            ->orderBy('created_at', 'desc');

        // Filters
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Role check: Sales can only see assigned leads
        if (auth()->user()->hasRole('Sales')) {
            $query->where('assigned_to', auth()->id());
        }

        $leads = $query->get();

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Leads/Create', [
            'projects' => Project::select('id', 'name')->get(),
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'required|in:New,Contacted,Converted,Lost',
            'notes' => 'nullable|string',
        ]);

        Lead::create($data);

        return redirect()->route('leads.index')->with('success', 'Lead added successfully!');
    }

    public function edit(Lead $lead)
    {
        return Inertia::render('Leads/Edit', [
            'lead' => $lead->load(['project', 'assignedUser']),
            'projects' => Project::select('id', 'name')->get(),
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'required|in:New,Contacted,Converted,Lost',
            'notes' => 'nullable|string',
        ]);

        $lead->update($data);

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully!');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully!');
    }
}
