<?php

namespace App\Enums;

enum PermissionsEnum: string{
    case UserCreate = 'user.create';
    case UserEdit = 'user.edit';
    case UserDelete = 'user.delete';
    case UserShow = 'user.show';    
}