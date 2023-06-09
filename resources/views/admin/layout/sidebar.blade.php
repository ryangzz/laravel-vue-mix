<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ config('app.url') }}" class="brand-link">
      <img src="{{ url('admin_template/dist/img/AdminLTELogo.png') }}" alt="{{ config('app.name')}}" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">{{ config('app.name')}}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="{{ url('admin_template/dist/img/user2-160x160.jpg') }}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="#" class="nav-link @if(request()->route()->named('admin.home')) active @endif">
              <i class="nav-icon fas fa-home"></i>
              <p>
                Inicio                
              </p>
            </a>            
          </li>
          @if(true)                                                   
          <li class="nav-item">
            <a href="{{ route('users.index') }}" class="nav-link @if(request()->route()->named('users.*')) active @endif">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Usuarios
                <span class="right badge badge-danger">New</span>
              </p>
            </a>
          </li> 
          @endif
          
          <li class="nav-item">
            <a href="{{ route('cash_register.index') }}" class="nav-link @if(request()->route()->named('cash_register.*')) active @endif">
              <i class="nav-icon fas fa-cash-register"></i>              
              <p>
                Caja
                <span class="right badge badge-danger">New</span>
              </p>
            </a>
          </li> 

          
                    
          
          
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
      <div class="fixed-bottom position-absolute">
        <form class="d-flex justify-content-start" method="post" class="" action="{{ route('logout') }}">
          @csrf
          <button class="text-left btn btn-link text-white px-2 nav-link pl-4" href="javascript:this.parentNode.submit()">
            
            <i class="fas fa-sign-out-alt"></i>
            <span>
              Cerrar Sesión
            </span>
          </button>
        </form>
      </div>
    </div>
    <!-- /.sidebar -->
</aside>