<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use App\Models\Organisation;
use App\Models\Organisation_role;
use App\Models\Salle;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

use Carbon\Carbon;

class TestController extends Controller
{
    public function test(){

        /*$existingUser = User::where('email', 'test@test.com')->first();

        if($existingUser){
            $existingUser->delete();
        }*/

        $user = new user();
        $user->name = "TEST";
        $user->email = "test@test.com";
        $user->password = Hash::make("password");
        $user->role = 0;
        //dd($user->save());
        $user->save();

        /*$existingOrganisation = Organisation::where('name','mairie 1')->first();

        if(0){
            $existingOrganisation->delete();
        }*/

        $organisation = new organisation();
        $organisation->type = "gouvernement";
        $organisation->name = "mairie 1";
        //dd($organisation->save());
        $organisation->save();

        $role = new organisation_role();
        $role->name = "manager";
        $role->organisation_id=1;
        $role->user_id=1;
        dd($role->save());
    }

    public function test2(){
        $salle = new salle();
        $salle->name = "Entrepot";
        $salle->salle = "D7";
        $salle->rue = "1 rue test";
        $salle->code_postale = "75000";
        $salle->taille="40";
        dd($salle->save());
    }

    /*public function liste_organisation_test(){
        $organisation = Organisation::get();
        dd($organisation);
    }*/

    public function liste_organisation_member_test(){
        if(User::where('email', 'test@test.com')->first()->organisation_role->name=='manager'){
            $user = User::where('email', 'test@test.com')->with('organisation_role.organisation')->first();
        } else {
            dd(0);
        };
        dd($user,$user->organisation_role,$user->organisation_role->organisation->organisation_role->user);
        $a;
    }

    public function test3(){
        $advice = new advice();
        $advice->title = "titre test energie";
        $advice->type = "energie";
        $date = Carbon::createFromFormat('d/m/y', '01/01/24')->format('d/m/Y');
        $advice->date_publication = $date;
        $advice->content = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna a purus iaculis laoreet consectetur at metus. Nam tortor diam, aliquet nec odio sed, interdum blandit mauris. Nulla efficitur fermentum posuere. Sed at leo sit amet velit sollicitudin eleifend. Duis ullamcorper suscipit sapien, sed viverra turpis dapibus eu. Donec eget vestibulum nulla. In pellentesque, lorem ac sollicitudin fringilla, ante nisl imperdiet sapien, molestie scelerisque lorem risus quis ex. Suspendisse sagittis rhoncus eros in egestas. Vivamus at nunc quis nulla pharetra ultrices a quis velit. </p> <p>Donec lacinia maximus odio vitae lobortis. Morbi vehicula quis justo mollis consequat. Sed id eros varius, iaculis arcu eget, semper augue. Sed congue at nibh nec mattis. Fusce fermentum, lorem ac lobortis condimentum, orci dolor pellentesque dui, ultricies lobortis justo lectus at libero. Morbi nec pharetra nunc, quis iaculis erat. Vivamus turpis enim, rhoncus sed tempus eget, luctus in nisl. Fusce ac bibendum mi. Sed placerat, odio sit amet congue pharetra, neque sapien cursus ligula, vel vestibulum tortor nisi in nibh. In id lectus pulvinar elit placerat cursus. Aliquam lacinia tellus orci, id accumsan elit tempor a. Nulla nibh arcu, porta a massa vitae, pulvinar fringilla eros. Nullam vitae eros sit amet eros scelerisque convallis.</p> <a href='#'>source sondage</a>";
        $advice->save();
        //dd($advice->save(),Advice::latest()->first());
        return Inertia::render('Service/ConseilArticle',['article' => Advice::latest()->first()]);
    }

    public function test4(){
        $advice = new advice();
        $advice->title = "random recette cuisine";
        $advice->type = "recette";
        $date = Carbon::createFromFormat('d/m/y', '01/01/24')->format('d/m/Y');
        $advice->date_publication = $date;
        $advice->content = "
        <h2 class='text-2xl mb-'>Ingredient :</h2> <br>
        <ul class='list-dot'>
        <li class='list-item'>pomme</li>
        <li class='list-item'>orange</li>
        <li class='list-item'>fraise</li>
        </ul>
        <br><h2 class='text-2xl mb-'>Préparation :</h2> <br>
        <ol class='list-num'>
        <li class='list-item'>Verser la farine sur le plan de travail. Ajouter le beurre et le sel. Mélanger du bout des doigts jusqu'à obtenir un mélange sablé. Faire un puits au centre, ajouter l'œuf et l’eau. Mélanger puis écraser avec la paume de la main pour amalgamer la pâte. Former un palet de 2-3 cm d'épaisseur et l’envelopper dans du film alimentaire ou du bee wrap. Laisser reposer 2 heures minimum au réfrigérateur.</li>
        <li class='list-item'>Laver les courgettes et les émincer à l’aide d’un économe afin de réaliser comme des tagliatelles. Les placer dans une passoire, saler et laisserdégorger 15 minutes. Bien égoutter pour retirer le plus d’eau possible. Préchauffer le four à 180 ° C.</li>
        <li class='list-item'>Étaler la pâte sur une feuille de papier sulfurisé. Parsemer le fond de tarte de parmesan réduit en poudre en laissant un bord de 4 cm. Disposer les tagliatelles de courgette. Les arroser de 3 cuillerées à soupe d’huile d’olive pimentée. Rabattre les bords de la pâte sur les courgettes. Glisser le papier avec la tarte sur une plaque de four. Battre le jauned'œuf et badigeonner le bord de la tarteà l'aide d’un pinceau. Enfourner pour 30 minutes. Juste avant de servir, disposer la burrata sur la tarte et l’ouvrir en deux. Saler, poivrer et ajouter un filet d’huile pimentée. Déguster chaud ou froid.</li>
        </ol>
        ";
        $advice->save();
        //dd($advice->save(),Advice::latest()->first());
        return Inertia::render('Service/Article',['article' => Advice::latest()->first()]);
    }

    public function test5(){
        $advice = new advice();
        $advice->title = "random conseil gaspi titre";
        $advice->type = "gaspi";
        $date = Carbon::createFromFormat('d/m/y', '01/01/24')->format('d/m/Y');
        $advice->date_publication = $date;

        $advice->content = "
        <h2>STOP GASPI</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo consectetur nulla. Donec nec ligula ut mauris gravida vehicula. Cras eget dolor ex. Vestibulum cursus dolor magna, nec imperdiet risus mattis a. Suspendisse id gravida sapien. Nam ac orci dictum, laoreet mauris eu, elementum diam. Aliquam sed eros turpis.</p>
        <a href='#'>source</a>
        ";
        $advice->save();
        //dd($advice->save(),Advice::latest()->first());
        return Inertia::render('Service/Article',['article' => Advice::latest()->first()]);
    }
    
    public function test6(){
        $advice = new advice();
        $advice->title = "random conseil energie titre";
        $advice->type = "energie";
        $date = Carbon::createFromFormat('d/m/y', '01/01/24')->format('d/m/Y');
        $advice->date_publication = $date;

        $advice->content = "
        <h2>STOP GASPI</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo consectetur nulla. Donec nec ligula ut mauris gravida vehicula. Cras eget dolor ex. Vestibulum cursus dolor magna, nec imperdiet risus mattis a. Suspendisse id gravida sapien. Nam ac orci dictum, laoreet mauris eu, elementum diam. Aliquam sed eros turpis.</p>
        <a href='#'>source</a>
        ";
        $advice->save();
        //dd($advice->save(),Advice::latest()->first());
        return Inertia::render('Service/Article',['article' => Advice::latest()->first()]);
    }
}
