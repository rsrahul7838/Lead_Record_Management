<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;


class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = Client::with('agent');

        // Filters
        if ($request->filled('agent_id')) {
            $query->where('assigned_agent_id', $request->agent_id);
        }
        if ($request->filled('location')) {
            $query->where('preferred_location', 'like', "%{$request->location}%");
        }
        if ($request->filled('min_budget')) {
            $query->where('budget', '>=', $request->min_budget);
        }
        if ($request->filled('max_budget')) {
            $query->where('budget', '<=', $request->max_budget);
        }

        $clients = $query->latest()->get();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
            'agents' => User::select('id', 'name')->get(),
            'filters' => $request->only(['agent_id', 'location', 'min_budget', 'max_budget']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Clients/Create', [
            'agents' => User::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'budget' => 'nullable|numeric',
            'preferred_location' => 'nullable|string|max:255',
            'assigned_agent_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
            'next_followup_date' => 'nullable|date',
        ]);

        Client::create($validated);

        return redirect()->route('clients.index')->with('success', 'Client added successfully!');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client,
            'agents' => User::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'budget' => 'nullable|numeric',
            'preferred_location' => 'nullable|string|max:255',
            'assigned_agent_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
            'next_followup_date' => 'nullable|date',
        ]);

        $client->update($validated);

        return redirect()->route('clients.index')->with('success', 'Client updated successfully!');
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return back()->with('success', 'Client deleted successfully!');
    }
    public function calendar()
    {
        $clients = Client::whereNotNull('next_followup_date')
            ->with('agent')
            ->orderBy('next_followup_date', 'asc')
            ->get(['id', 'name', 'next_followup_date', 'preferred_location', 'assigned_agent_id']);

        $events = $clients->map(function ($client) {
            return [
                'id' => $client->id,
                'title' => $client->name .
                    ($client->preferred_location ? ' (' . $client->preferred_location . ')' : ''),
                'start' => Carbon::parse($client->next_followup_date)->format('Y-m-d'),
                'end'   => Carbon::parse($client->next_followup_date)->format('Y-m-d'),
                'agent' => $client->agent?->name,
            ];
        });

        return Inertia::render('Clients/Calendar', [
            'events' => $events,
        ]);
    }
}
