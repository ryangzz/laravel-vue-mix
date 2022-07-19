<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>{{ config('app.name' )}}  | Log In</title>
      
      @include('admin.layout.styles')
      <!-- icheck bootstrap -->
      <link rel="stylesheet" href="{{ url('admin_template/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
      
   </head>
   <body class="hold-transition login-page">
      <div class="login-box">
         <!-- /.login-logo -->
         <div class="card card-outline card-primary">
            <div class="card-header text-center">
               <a href="" class="h1"><b>{{ config('app.name')}}</b></a>
            </div>
            <div class="card-body">
               <p class="login-box-msg">Iniciar Sesion</p>
               @include('includes.errors')
               <form action="{{ route('login') }}" method="post">
                    @csrf
                  <div class="input-group mb-3">
                     <input type="email" name="email" class="form-control" placeholder="Email">
                     <div class="input-group-append">
                        <div class="input-group-text">
                           <span class="fas fa-envelope"></span>
                        </div>
                     </div>
                  </div>
                  <div class="input-group mb-3">
                     <input type="password" name="password" class="form-control" placeholder="Contraseña">
                     <div class="input-group-append">
                        <div class="input-group-text">
                           <span class="fas fa-lock"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-6">
                        <div class="icheck-primary">
                           <input type="checkbox" id="remember" name="remember">
                           <label for="remember">
                           Remember Me
                           </label>
                        </div>
                     </div>
                     <!-- /.col -->
                     <div class="col-6">
                        <button type="submit" class="btn btn-primary btn-block">Iniciar sesion</button>
                     </div>
                     <!-- /.col -->
                  </div>
               </form>                                          
            </div>            
         </div>         
      </div>      
      @include('admin.layout.scripts')
   </body>
</html>