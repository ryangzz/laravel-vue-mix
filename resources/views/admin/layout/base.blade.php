<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
  <title>{{ config('app.name' )}} | Starter</title>
      
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap" rel="stylesheet">
  @include('admin.layout.styles')
  <style>
    html *:not(i):not(span){
      font-family: 'Poppins' !important
    }
  </style>
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">

  @include('admin.layout.topbar')

  @include('admin.layout.sidebar')

  <div class="content-wrapper pt-2"> 
    @if($require_header ?? false)   
      @include('admin.layout.content-header')    
    @endif

  
    <div id="app">
      @yield('content')
    </div>
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
    <div class="p-3">
      <h5>Title</h5>
      <p>Sidebar content</p>
    </div>
  </aside>
  <!-- /.control-sidebar -->

  @include('admin.layout.footer')
</div>
<!-- ./wrapper -->



  @include('admin.layout.scripts')   
    
  
</body>
</html>
