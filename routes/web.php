<?php

use App\Http\Controllers\AdministrationController;
use App\Http\Controllers\BenevoleController;
use App\Http\Controllers\HarvestAssignmentController;
use App\Http\Controllers\HarvestRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VolunteerScheduleController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\BenevoleMiddleware;
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

Route::get('/contact', [TicketController::class, 'contact'])->name('contact.show');

Route::middleware('auth')->group(function () {
    Route::middleware([AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/', [UserController::class, 'admin'])->name('admin');

        Route::resource('stock-movements', StockMovementController::class)->only(['index', 'create', 'store']);

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

        Route::get('/harvest-requests', [HarvestRequestController::class, 'index'])->name('harvest-requests.index');
        Route::get('/harvest-requests/{id}/assign', [HarvestAssignmentController::class, 'assign'])->name('harvest-requests.assign');
        Route::post('/harvest-requests/{id}/assign', [HarvestAssignmentController::class, 'storeAssignment'])->name('harvest-requests.assign.store');
        Route::get('/harvest-requests/{id}/complete', [HarvestRequestController::class, 'complete'])->name('harvest-requests.complete');
        Route::post('/harvest-requests/{id}/complete', [HarvestRequestController::class, 'storeComplete'])->name('harvest-requests.complete.store');

    });

    Route::middleware('verified')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('/benevolat', function () {
            return Inertia::render('Candidature/Info');
        })->name('benevolat');

        Route::get('/abonnement', function () {
            return Inertia::render('Abonnement/Index');
        })->name('abonnement');

        Route::get('/abonnement/payment', [StripeController::class, 'showPaymentPage'])->name('abonnement.payment.page');
        Route::post('/abonnement/payment/intent', [StripeController::class, 'createPaymentIntent'])->name('abonnement.payment.intent');
        Route::post('/abonnement/payment/handle', [StripeController::class, 'handlePayment'])->name('abonnement.handlePayment');

        Route::resource('candidature', BenevoleController::class);

        Route::get('/harvest-requests/create', [HarvestRequestController::class, 'create'])->name('harvest-requests.create');
        Route::post('/harvest-requests', [HarvestRequestController::class, 'store'])->name('harvest-requests.store');

        Route::get('/ticket/create', [TicketController::class, 'create'])->name('ticket.create');
        Route::post('/ticket', [TicketController::class, 'store'])->name('ticket.store');
        Route::get('/tickets/{Id}', [TicketController::class, 'customerIndex'])->name('tickets.index');
        Route::get('/ticket/{id}', [TicketController::class, 'show'])->name('ticket.show');
        Route::put('/ticket/{id}', [TicketController::class, 'update'])->name('ticket.update');

        Route::middleware([BenevoleMiddleware::class])->prefix('benevole')->group(function () {
            Route::get('/schedule', [VolunteerScheduleController::class, 'index'])->name('benevole.schedule');
            Route::resource('stock', StockController::class);
        });

        Route::get('administration', [AdministrationController::class, 'administration'])->name('administration');
        Route::get('addOrganisation', [AdministrationController::class, 'addOrganisation'])->name('addOrganisation');
        Route::post('addOrganisationPost', [AdministrationController::class, 'addOrganisationPost'])->name('addOrganisationPost');
        Route::get('EditMemberOrganisation', [AdministrationController::class, 'EditMemberOrganisation'])->name('EditMemberOrganisation');

        Route::get('service', [ServiceController::class, 'indexService'])->name('indexService');
        Route::post('checkTypeConseil', [ServiceController::class, 'checkTypeConseil'])->name('checkTypeConseil');
        Route::get('addConseil', [ServiceController::class, 'addConseil'])->name('addConseil');
        Route::post('addConseilPost', [ServiceController::class, 'addConseilPost'])->name('addConseilPost');
        Route::get('conseil_anti_gaspi', [ServiceController::class, 'conseilAntiGaspi'])->name('conseilAntiGaspi');
        Route::get('article_anti_gaspi/{id}', [ServiceController::class, 'articleAntiGaspi'])->name('articleAntiGaspi');
        Route::get('conseil_economie_energie', [ServiceController::class, 'conseilEconomieEnergie'])->name('conseilconomieEnergie');
        Route::get('article_economie_energie/{id}', [ServiceController::class, 'articleconomieEnergie'])->name('articleconomieEnergie');
        Route::get('addRecette', [ServiceController::class, 'addRecette'])->name('addRecette');
        Route::get('tuto_cuisine', [ServiceController::class, 'RecetteCuisine'])->name('RecetteCuisine');
        Route::get('article_cuisine/{id}', [ServiceController::class, 'articleRecetteCuisine'])->name('articleRecetteCuisine');
        Route::get('addPublicVehicule', [ServiceController::class, 'addPublicVehicule'])->name('addPublicVehicule'); 
        Route::post('addPublicVehiculePost', [ServiceController::class, 'addPublicVehiculePost'])->name('addPublicVehiculePost');
        Route::get('listeVehicule/{ville}', [ServiceController::class, 'ListeVehicule'])->name('ListeVehicule');
        Route::get('allVehiculeReservation/{vehicule}/{date}', [ServiceController::class, 'allVehiculeReservation'])->name('allVehiculeReservation');
        Route::post('ReservationVehiculePost', [ServiceController::class, 'ReservationVehiculePost'])->name('ReservationVehiculePost');
        Route::get('serviceChoice', [ServiceController::class, 'indexChoice'])->name('indexChoice');
        Route::post('serviceResume', [ServiceController::class, 'serviceResume'])->name('serviceResume');

    });
});



Route::get('test', [TestController::class, 'test'])->name('test');
Route::get('test2', [TestController::class, 'test2'])->name('test2');
Route::get('test3', [TestController::class, 'test3'])->name('test3');
Route::get('test4', [TestController::class, 'test4'])->name('test4');
Route::get('test5', [TestController::class, 'test5'])->name('test5');
Route::get('test6', [TestController::class, 'test6'])->name('test6');
Route::get('liste_organisation_test', [TestController::class, 'liste_organisation_test']);
Route::get('liste_organisation_member_test', [TestController::class, 'liste_organisation_member_test']);


require __DIR__.'/auth.php';
