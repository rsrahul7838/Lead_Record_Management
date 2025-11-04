<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::with('owner')->latest()->get();
        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'flash' => session()->only(['success'])

        ]);
    }

    public function create()
    {
        return Inertia::render('Leads/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $data['owner_id'] = auth()->id();

        Lead::create($data);

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    public function edit(Lead $lead)
    {
        return Inertia::render('Leads/Edit', ['lead' => $lead]);
    }

    public function update(Request $request, Lead $lead)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $lead->update($data);

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully.');
    }
}
