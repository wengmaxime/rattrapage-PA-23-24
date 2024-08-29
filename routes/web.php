<?php

use App\Http\Controllers\BenevoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
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
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware([AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/', [UserController::class, 'admin'])->name('admin');

        Route::prefix('candidatures')->group(function () {
            Route::get('/EnAttente', [BenevoleController::class, 'candidaturesEnAttente'])->name('candidatures.index.enattente');
            Route::get('/EnExamen', [BenevoleController::class, 'candidaturesEnExamen'])->name('candidatures.index.enexamen');
            Route::get('/Refusees', [BenevoleController::class, 'candidaturesRefusees'])->name('candidatures.index.refusees');

            Route::patch('{id}/EnAttente', [BenevoleController::class, 'updateEnAttente'])->name('candidatures.update.enattente');
            Route::patch('{id}/EnExamen', [BenevoleController::class, 'updateEnExamen'])->name('candidatures.update.enexamen');
            Route::patch('{id}/Refusees', [BenevoleController::class, 'updateRefusees'])->name('candidatures.update.refusees');
            Route::patch('{id}/Validees', [BenevoleController::class, 'updateValidees'])->name('candidatures.update.validees');
            Route::get('{id}/Details', [BenevoleController::class, 'show'])->name('candidature.details');
        });

    });
    Route::get('/benevolat', function () {
        return Inertia::render('Candidature/CandidatureInfo');
    })->name('benevolat');

    Route::resource('candidature', BenevoleController::class);

});

Route::get('service', [ServiceController::class, 'indexService'])->name('indexService');
Route::get('conseil_anti_gaspi', [ServiceController::class, 'conseilAntiGaspi'])->name('conseilAntiGaspi');
Route::get('article_anti_gaspi/{id}', [ServiceController::class, 'articleAntiGaspi'])->name('articleAntiGaspi');
Route::get('conseil_economie_energie', [ServiceController::class, 'conseilEconomieEnergie'])->name('conseilconomieEnergie');
Route::get('article_economie_energie/{id}', [ServiceController::class, 'articleconomieEnergie'])->name('articleconomieEnergie');
Route::get('tuto_cuisine', [ServiceController::class, 'RecetteCuisine'])->name('RecetteCuisine');
Route::get('article_cuisine/{id}', [ServiceController::class, 'articleRecetteCuisine'])->name('articleRecetteCuisine');
Route::get('serviceChoice', [ServiceController::class, 'indexChoice'])->name('indexChoice');
Route::post('serviceResume', [ServiceController::class, 'serviceResume'])->name('serviceResume');

Route::get('test', [TestController::class, 'test'])->name('test');
Route::get('test2', [TestController::class, 'test2'])->name('test2');
Route::get('test3', [TestController::class, 'test3'])->name('test3');
Route::get('test4', [TestController::class, 'test4'])->name('test4');
Route::get('test5', [TestController::class, 'test5'])->name('test5');
Route::get('test6', [TestController::class, 'test6'])->name('test6');
Route::get('liste_organisation_test', [TestController::class, 'liste_organisation_test']);
Route::get('liste_organisation_member_test', [TestController::class, 'liste_organisation_member_test']);


require __DIR__.'/auth.php';
