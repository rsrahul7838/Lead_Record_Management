<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AgentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'role:Admin'])->prefix('admin')->group(function () {
    Route::resource('roles', RoleController::class);
});

Route::middleware(['auth', 'role:Admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('/leads/create', [LeadController::class, 'create'])->name('leads.create');
    Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');
    Route::put('/leads/{lead}/assign', [LeadController::class, 'assign'])->name('leads.assign');
    Route::get('/leads/{lead}', [LeadController::class, 'show'])->name('leads.show');
    Route::get('/leads/{lead}/edit', [LeadController::class, 'edit'])->name('leads.edit');
    Route::put('/leads/{lead}', [LeadController::class, 'update'])->name('leads.update');
    Route::delete('/leads/{lead}', [LeadController::class, 'destroy'])->name('leads.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings/update', [SettingController::class, 'update'])->name('settings.update');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('tasks', TaskController::class)->except(['show']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/tasks/board', [TaskController::class, 'board'])->name('tasks.board');
    Route::post('/tasks/update-status', [TaskController::class, 'updateStatus'])->name('tasks.updateStatus');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Route::middleware(['auth'])->group(function () {
//     Route::resource('leads', LeadController::class);
// });

// Real E-state

Route::middleware(['auth'])->group(function () {
    Route::resource('properties', PropertyController::class);
    Route::delete('/property-media/{media}', [PropertyController::class, 'destroyMedia'])->name('properties.media.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('clients', ClientController::class)->except(['show']);
    Route::get('clients/calendar', [ClientController::class, 'calendar'])->name('clients.calendar');
});

Route::middleware('auth')->group(function () {
    // ✅ Custom routes should go BEFORE resource
    Route::get('/follow-ups/today', [FollowUpController::class, 'today'])->name('follow-ups.today');

    Route::resource('follow-ups', FollowUpController::class)->parameters([
        'follow-ups' => 'followUp'
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/payments/invoice/{id}', [PaymentController::class, 'invoice'])
        ->name('payments.invoice');
    Route::resource('payments', PaymentController::class);
});


Route::middleware(['auth'])->group(function () {
    Route::get('/agent/index', [AgentController::class, 'dashboard'])->name('agent.dashboard');
});
require __DIR__ . '/auth.php';
