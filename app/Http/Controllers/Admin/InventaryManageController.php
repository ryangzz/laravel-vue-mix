<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventaryManageController extends Controller
{
    public function index(){
        return view('admin.inventary_manage.index');
    }
}
