<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use App\Models\Car;
use App\Models\Service;
use App\Models\vehicule_reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

use Illuminate\Support\Facades\Redirect;

class ServiceController extends Controller
{

    public function indexService(){
        return Inertia::render('Service/indexService',);
    }

    public function indexChoice(){
        return Inertia::render('Service/Choice',);
    }

    public function checkTypeConseil(Request $request){
        //dd($request);
        return redirect()->route('addConseil',)->with('type',$request['type']);
    }

    public function addConseil(Request $request){

        return Inertia::render('Service/AddConseil',['type'=>$request['type']]);
    }

    public function addConseilPost(Request $request){
        //dd($request);
        $advice = new advice();
        $advice->title=$request['title'];
        $advice->type=$request['type'];
        //$advice->introduction;
        $advice->date_publication=Carbon::now()->format('d/m/Y');;
        $advice->content=$request['content'];
        //dd($advice);
        if($advice->save()){
            return redirect()->route('indexService',);
        }
    }

    public function conseilAntiGaspi(){
        $advice = Advice::where('type','=','gaspi')->orderBy('date_publication', 'desc')->get();
        $advice = $advice->map(function ($advice) {
            if (empty($advice->introduction)) {
                $advice->introduction = 'cliquez pour découvrir';
            }
            return $advice;
        });
        return Inertia::render('Service/ArticleList',['titre'=>"conseil anti gaspi",'articles' => $advice/*orderBy('id', 'desc')->paginate(10)*/,'empty-message'=>'cliquez pour découcrir']);
    }

    public function articleAntiGaspi($id,Request $request){
        return Inertia::render('Service/Article',['article' => Advice::where('id','=',$id)->first()]);
    }

    public function conseilEconomieEnergie(){
        $advice = Advice::where('type','=','energie')->orderBy('date_publication', 'desc')->get();
        $advice = $advice->map(function ($advice) {
            if (empty($advice->introduction)) {
                $advice->introduction = 'cliquez pour découvrir';
            }
            return $advice;
        });
        return Inertia::render('Service/ArticleList',['titre'=>"conseil economie energie",'articles' => $advice/*orderBy('id', 'desc')->paginate(10)*/,'empty-message'=>'cliquez pour découcrir']);
    }

    public function articleconomieEnergie($id,Request $request){
        return Inertia::render('Service/Article',['article' => Advice::where('id','=',$id)->first()]);
    }

    public function addRecette(){
        return Inertia::render('Service/AddRecette',);
    }

    public function RecetteCuisine(){
        $advice = Advice::where('type','=','recette')->orderBy('date_publication', 'desc')->get();
        $advice = $advice->map(function ($advice) {
            if (empty($advice->introduction)) {
                $advice->introduction = 'cliquez pour découvrir';
            }
            return $advice;
        });
        //dd($advice);
        //dd(Advice::get());
    return Inertia::render('Service/ArticleList',['titre'=>"recette cuisine",'articles' =>$advice /*orderBy('id', 'desc')->paginate(10)*/,'empty-message'=>'cliquez pour découcrir']);
    }

    public function articleRecetteCuisine($id,Request $request){
        return Inertia::render('Service/Article',['article' => Advice::where('id','=',$id)->first()]);
    }

    public function addPublicVehicule(Request $request){
        //dd($request);
        return Inertia::render('Service/AddVehicule',['city'=>$request['city']]);
    }

    public function addPublicVehiculePost(Request $request){
        //dd($request);
        $car = new Car();
        $car->modele=$request['modele'];
        $car->immatriculation=$request['immatriculation'];
        $car->city=$request['city'];
        if($car->save()){
            return redirect()->route('ListeVehicule',['ville' => $request['city']]);
        }
    }

    public function ListeVehicule($ville){
        //dd($ville);
        //dd(Car::where('city','=',$ville)->get());
        return Inertia::render('Service/VehiculeListe',['vehicule'=>Car::where('city','=',$ville)->get(),'ville'=>$ville]);
    }

    public function allVehiculeReservation($vehicule, $date) {
        try {
            $reservation = vehicule_reservation::where('vehicule_id','=', $vehicule)
                              ->where('date_time','=', $date)
                              ->first();
                              
            return response()->json($reservation);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function ReservationVehiculePost(Request $request){
        //dd($request);
        $reservation = new vehicule_reservation();
        $reservation->vehicule_id=$request['vehicule'];
        $reservation->user_id=$request['user'];
        $reservation->date_time=$request['date'];
        dd($reservation->save());
    }

    public function serviceResume(Request $request){
        dd($request);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
