<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => RolesEnum::Admin->value]);

        $permissions = [
            PermissionsEnum::UserCreate->value,
            PermissionsEnum::UserDelete->value,
            PermissionsEnum::UserEdit->value,
            PermissionsEnum::UserShow->value,
        ];

        foreach($permissions as $permission){
            $permissionDb = Permission::create(['name' => $permission]);
            $role->givePermissionTo($permissionDb);
        }
    }
}
