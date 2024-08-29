<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    protected $table = 'organisation';

    public function organisation_role(){
        return $this->hasMany(organisation_role::class);
    }

    public function membres(){
        return $this->organisation_role()->user();
    }
}
