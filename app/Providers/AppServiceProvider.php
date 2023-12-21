<?php

namespace App\Providers;

use App\Contracts\TextToSpeechInterface;
use App\Contracts\UserServiceInterface;
use App\Services\TextToSpeechPlayHTService;
use App\Services\UserService;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(TextToSpeechInterface::class, TextToSpeechPlayHTService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Loader Alias
        $loader = AliasLoader::getInstance();
        // SANCTUM CUSTOM PERSONAL-ACCESS-TOKEN
        $loader->alias(\Laravel\Sanctum\PersonalAccessToken::class, \App\Models\Sanctum\PersonalAccessToken::class);
    }
}
