<?php

namespace App\Http\Controllers;

use App\Models\FollowUp;
use App\Models\Lead;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class FollowUpController extends Controller
{
    public function index(Request $request)
    {
        $query = FollowUp::with(['lead', 'client', 'user']);

        // Filters: mode, agent, status (upcoming/missed/done), date range
        if ($request->filled('mode')) {
            $query->where('mode', $request->mode);
        }
        if ($request->filled('agent')) {
            $query->where('user_id', $request->agent);
        }
        if ($request->filled('status')) {
            if ($request->status === 'upcoming') {
                $query->where('followup_at', '>=', now());
                $query->where('done', false);
            } elseif ($request->status === 'missed') {
                $query->where('followup_at', '<', now());
                $query->where('done', false);
            } elseif ($request->status === 'done') {
                $query->where('done', true);
            }
        }
        if ($request->filled('from')) {
            $query->whereDate('followup_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('followup_at', '<=', $request->to);
        }

        $followups = $query->latest()->get();

        return Inertia::render('FollowUps/Index', [
            'followups' => $followups,
            'agents' => \App\Models\User::select('id', 'name')->get(),
            'filters' => $request->only(['mode', 'agent', 'status', 'from', 'to']),
        ]);
    }

    public function create(Request $request)
    {
        // optional prefill from lead or client
        $lead = $request->filled('lead_id') ? Lead::find($request->lead_id) : null;
        $client = $request->filled('client_id') ? Client::find($request->client_id) : null;

        return Inertia::render('FollowUps/Create', [
            'lead' => $lead,
            'client' => $client,
            'agents' => \App\Models\User::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lead_id' => 'nullable|exists:leads,id',
            'client_id' => 'nullable|exists:clients,id',
            'user_id' => 'required|exists:users,id',
            'mode' => 'required|in:Call,Visit,Email,Other',
            'summary' => 'nullable|string',
            'followup_at' => 'nullable|date',
            'done' => 'nullable|boolean',
        ]);

        FollowUp::create($validated);

        return redirect()->route('follow-ups.index')->with('success', 'Follow-up logged.');
    }

    public function show(FollowUp $followUp)
    {
        $followUp->load('lead', 'client', 'user');
        return Inertia::render('FollowUps/Show', ['followup' => $followUp]);
    }

    public function edit(FollowUp $followUp)
    {
        $followUp->load('lead', 'client', 'user');
        return Inertia::render('FollowUps/Edit', [
            'followup' => $followUp,
            'agents' => \App\Models\User::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, FollowUp $followUp)
    {
        $validated = $request->validate([
            'lead_id' => 'nullable|exists:leads,id',
            'client_id' => 'nullable|exists:clients,id',
            'user_id' => 'required|exists:users,id',
            'mode' => 'required|in:Call,Visit,Email,Other',
            'summary' => 'nullable|string',
            'followup_at' => 'nullable|date',
            'done' => 'nullable|boolean',
        ]);

        $followUp->update($validated);

        return redirect()->route('follow-ups.index')->with('success', 'Follow-up updated successfully.');
    }

    public function destroy(FollowUp $followUp)
    {
        $followUp->delete();
        return back()->with('success', 'Follow-up deleted.');
    }

    // Shortcut: return follow-ups for today (for dashboard)
    public function today()
    {
        $today = Carbon::today();

        $nextFollowUps = FollowUp::with(['lead', 'client', 'user'])
            ->whereDate('followup_at', $today)
            ->where('done', false)
            ->orderBy('followup_at')
            ->get();

        return Inertia::render('FollowUps/Today', [
            'followUps' => $nextFollowUps,
        ]);
    }
}
