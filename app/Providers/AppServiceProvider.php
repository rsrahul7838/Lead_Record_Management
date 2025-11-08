<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Setting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'app' => function () {
                return [
                    'name' => Setting::getValue('app_name', config('app.name')),
                    'theme' => Setting::getValue('theme', 'Light'),
                ];
            },
            'flash' => fn() => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
