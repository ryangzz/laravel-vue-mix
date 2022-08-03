@extends('admin.layout.base')


@section('content')
<section class="content">
    <div class="error-page">
      <h2 class="headline text-warning">403</h2>

      <div class="error-content">
        <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! No cuentas con los permisos necesarios.</h3>

        <p>
          El incidente será reportado          
        </p>        
      </div>
      <!-- /.error-content -->
    </div>
    <!-- /.error-page -->
  </section>
@endsection