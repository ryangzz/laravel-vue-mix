<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CashRegisterController;
use App\Http\Controllers\Admin\InventaryManageController;
use App\Http\Controllers\Admin\TestController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {    
    return redirect()->route('admin.home');
});

Route::group(['prefix' => '/admin', 
#'middleware' => 'auth',
], function(){    

    Route::get('/', function(){
        return view('admin.home');
    })->name('admin.home');

    Route::resource('users', UserController::class);

    Route::get('caja', [CashRegisterController::class, 'index'])->name('cash_register.index');
    Route::get('inventario', [InventaryManageController::class, 'index'])->name('inventary_manage.index');
    Route::get('test', [TestController::class, 'index'])->name('test.index');


});
 
Auth::routes();

