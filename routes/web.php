<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    Log::info('hola');
    return view('welcome');
});

Route::group(['prefix' => 'admin', 'middleware' => 'auth',], function(){    

    Route::get('/', function(){
        return view('admin.home');
    })->name('admin.home');

    Route::resource('users', UserController::class);
});

 


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');