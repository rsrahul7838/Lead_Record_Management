<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Artisan;

class SettingController extends Controller
{
    public function index()
    {
        // Get existing settings or default values
        $settings = [
            'app_name' => Setting::getValue('app_name', config('app.name')),
            'theme' => Setting::getValue('theme', 'Light'),
        ];

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
        ]);
    }

   public function update(Request $request)
{
    $validated = $request->validate([
        'app_name' => 'required|string|max:255',
        'theme' => 'required|string',
    ]);

    foreach ($validated as $key => $value) {
        \App\Models\Setting::setValue($key, $value);
    }

    // Force Inertia props refresh
    session()->flash('success', 'Settings updated successfully!');

    // Clear Laravel’s config cache so app name updates everywhere
    // \Artisan::call('config:clear');
     Artisan::call('config:clear');

    return redirect()->route('settings.index');
}

}
