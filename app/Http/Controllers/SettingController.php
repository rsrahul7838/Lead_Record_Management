<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        // Get existing settings or default values
        $settings = [
            'app_name' => Setting::getValue('app_name', config('app.name')),
            'timezone' => Setting::getValue('timezone', 'Asia/Kolkata'),
            'language' => Setting::getValue('language', 'English'),
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
            'timezone' => 'required|string',
            'language' => 'required|string',
            'theme' => 'required|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::setValue($key, $value);
        }

        return redirect()->route('settings.index')->with('success', 'Settings updated successfully!');
    }
}
