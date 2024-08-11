<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benevole extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'phone',
        'validation',
        'motif',
        'service_1',
        'service_2',
        'service_3',
        'nationalite',
        'date_derniere_candidature',
        'age',
    ];

    /**
     * Get the first service the volunteer is associated with.
     */
    public function service1()
    {
        return $this->belongsTo(Service::class, 'service_1');
    }

    /**
     * Get the second service the volunteer is associated with.
     */
    public function service2()
    {
        return $this->belongsTo(Service::class, 'service_2');
    }

    /**
     * Get the third service the volunteer is associated with.
     */
    public function service3()
    {
        return $this->belongsTo(Service::class, 'service_3');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
