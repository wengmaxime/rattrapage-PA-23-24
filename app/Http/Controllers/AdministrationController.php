<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use App\Models\Organisation_role;
use App\Models\User;
use Inertia\Inertia;

use Illuminate\Http\Request;

class AdministrationController extends Controller
{
    public function administration(){
        return Inertia::render('Administration/AdministrationIndex',);
    }

    public function addOrganisation(){
        return Inertia::render('Administration/AddOrganisation',['user'=>User::get(),]);
    }

    public function addOrganisationPost(Request $request){
        //dd($request);
        $organisation = new Organisation();
        $organisation->type = $request['type'];
        $organisation->name = $request['name'];
        //dd($organisation->save());
        $organisation->save();
        //dd($organisation->latest()->first()->id);
        $manageur = new Organisation_role();
        $manageur->name="manageur";
        $manageur->organisation_id = $organisation->latest()->first()->id;
        $manageur->user_id=$request['user'];
        //dd($manageur->save());
        $manageur->save();
        return Inertia::render('Administration/AdministrationIndex',);
    }

    public function EditMemberOrganisation(Request $request){
        $user = $request->user()->organisation_role()->first()->organisation()->first()->organisation_role()->get();
        $users = $user->map(function ($role) {
            return $role->user;
        });
        //dd($users);
        return Inertia::render('Administration/EditMemberOrganisation',['users'=>$users,]);
    }

    public function addMemberOrganisationPost(){
        $member = new Organisation_role();
        $member->name="member";
        $member->organisation_id;
        $member->user_id=$request['user'];
        //dd($member->save());
        $member->save();
        return Inertia::render('Administration/AdministrationIndex',);
    }
}
