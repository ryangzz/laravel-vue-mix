<?php

namespace App\Http\Controllers\Admin;

use App\Enums\PermissionsEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('permission:' . PermissionsEnum::UserCreate->value)->only(['create', 'store']);
        $this->middleware('permission:' . PermissionsEnum::UserShow->value)->only(['index', 'edit']);
        $this->middleware('permission:' . PermissionsEnum::UserDelete->value)->only(['destroy',]);
        $this->middleware('permission:' . PermissionsEnum::UserEdit->value)->only(['edit', 'update']);
    }
    public function index(Request $request)
    {
        
        $users = User::paginate();

        return view('admin.user.index', compact('users'))
            ->with('i', (request()->input('page', 1) - 1) * $users->perPage());
    }
    
    public function create()
    {
        $user = new User();
        return view('admin.user.create', compact('user'));
    }

    public function store(Request $request)
    {        
        $user = User::create($request->all());

        return redirect()->route('users.index')
            ->with('success', 'User created successfully.');
    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);

        return view('admin.user.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {        
        $user->update($request->all());

        return redirect()->route('users.index')
            ->with('success', 'User updated successfully');
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $user = User::find($id)->delete();

        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully');
    }
}
