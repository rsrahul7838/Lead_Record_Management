<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyMedia;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['project','agent','media']);

        // simple filters
        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function($qry) use ($q) {
                $qry->where('name','like', "%{$q}%")
                    ->orWhere('location','like', "%{$q}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', floatval($request->min_price));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', floatval($request->max_price));
        }

        $properties = $query->latest()->get();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'projects' => Project::select('id','name')->get(),
            'agents' => User::select('id','name')->get(),
            'filters' => $request->only(['q','status','type','min_price','max_price']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Properties/Create', [
            'projects' => Project::select('id','name')->get(),
            'agents' => User::select('id','name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:Residential,Commercial',
            'location' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'status' => 'required|in:Available,Sold,Reserved',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_agent_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'media.*' => 'nullable|file|max:10240', // 10MB each
        ]);

        $property = Property::create($validated);

        // handle uploads
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $this->storeMedia($property, $file);
            }
        }

        return redirect()->route('properties.index')->with('success', 'Property created.');
    }

    public function show(Property $property)
    {
        $property->load(['project','agent','media']);
        return Inertia::render('Properties/Show', ['property' => $property]);
    }

    public function edit(Property $property)
    {
        return Inertia::render('Properties/Edit', [
            'property' => $property->load('media'),
            'projects' => Project::select('id','name')->get(),
            'agents' => User::select('id','name')->get(),
        ]);
    }

    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:Residential,Commercial',
            'location' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'status' => 'required|in:Available,Sold,Reserved',
            'project_id' => 'nullable|exists:projects,id',
            'assigned_agent_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'media.*' => 'nullable|file|max:10240',
        ]);

        $property->update($validated);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $this->storeMedia($property, $file);
            }
        }

        return redirect()->route('properties.index')->with('success', 'Property updated.');
    }

    public function destroy(Property $property)
    {
        // delete related media files
        foreach ($property->media as $m) {
            if (Storage::disk('public')->exists($m->path)) {
                Storage::disk('public')->delete($m->path);
            }
        }
        $property->delete();

        return back()->with('success', 'Property deleted.');
    }

    // delete single media item (ajax)
    public function destroyMedia(PropertyMedia $media)
    {
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }
        $media->delete();

        return response()->json(['success' => true]);
    }

    protected function storeMedia(Property $property, $file)
    {
        $ext = $file->getClientOriginalExtension();
        $type = in_array(strtolower($ext), ['png','jpg','jpeg','gif','webp']) ? 'image' : 'document';
        $path = $file->store("properties/{$property->id}", 'public');

        return PropertyMedia::create([
            'property_id' => $property->id,
            'type' => $type,
            'path' => $path,
            'filename' => $file->getClientOriginalName(),
        ]);
    }
}
