<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{

    public function indexService(){
        return Inertia::render('Service/indexService',);
    }

    public function indexChoice(){
        return Inertia::render('Service/Choice',);
    }

    public function conseilAntiGaspi(){
        $advice = Advice::where('type','=','gaspi')->get();
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
        $advice = Advice::where('type','=','energie')->get();
        $advice = $advice->map(function ($advice) {
            if (empty($advice->introduction)) {
                $advice->introduction = 'cliquez pour découvrir';
            }
            return $advice;
        });
        return Inertia::render('Service/ArticleList',['titre'=>"conseil enconomie energie",'articles' => $advice/*orderBy('id', 'desc')->paginate(10)*/,'empty-message'=>'cliquez pour découcrir']);
    }

    public function articleconomieEnergie($id,Request $request){
        return Inertia::render('Service/Article',['article' => Advice::where('id','=',$id)->first()]);
    }

    public function RecetteCuisine(){
        $advice = Advice::where('type','=','recette')->get();
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

    public function article_RecetteCuisine($id,Request $request){
        
        return Inertia::render('Service/Article',['article' => Advice::where('id','=',$id)->first()]);
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
