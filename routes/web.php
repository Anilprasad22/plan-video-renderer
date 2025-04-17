<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('videos', [VideoController::class, 'index'])->name('videos');
    Route::get('/list-videos', [VideoController::class, 'list']);
    Route::get('/videos/search', [VideoController::class, 'search']);

});




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
