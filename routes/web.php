<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {    
    return redirect()->route('admin.home');
});

Route::group(['prefix' => '/admin', 'middleware' => 'auth',], function(){    

    Route::get('/', function(){
        return view('admin.home');
    })->name('admin.home');

    Route::resource('users', UserController::class);
});
 
Auth::routes();

