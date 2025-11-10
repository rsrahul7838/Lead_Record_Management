<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with(['project', 'user'])->latest()->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create', [
            'projects' => Project::all(),
            'users' => User::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|string',
            'status' => 'required|string',
            'due_date' => 'nullable|date',
        ]);

        Task::create($validated);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully!');
    }

    public function edit(Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task->load(['project', 'user']),
            'projects' => Project::all(),
            'users' => User::all(),
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|string',
            'status' => 'required|string',
            'due_date' => 'nullable|date',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully!');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return back()->with('success', 'Task deleted successfully!');
    }
    public function board()
    {
        $tasks = \App\Models\Task::with('project', 'user')->get();

        return Inertia::render('Tasks/Board', [
            'tasks' => $tasks,
        ]);
    }
    public function updateStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:tasks,id',
            'status' => 'required|string',
        ]);

        $task = \App\Models\Task::find($request->id);
        $task->status = $request->status;
        $task->save();

        return response()->json(['success' => true]);
    }
}
