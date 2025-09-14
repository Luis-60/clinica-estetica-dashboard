<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Authenticatable;
Use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\GenericUser;

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
        if (app()->environment('local')) {
            // $user = User::first();
            // if (!$user) {
                $user = new GenericUser([
                    'id' => 1,
                    'name' => 'Dev User',
                    'email' => 'dev@example.com',
                ]);
            // }
            // Auth::login($user);
        }
    }

}
