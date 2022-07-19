@if ($errors->any())
    <div class="alert alert-danger icons-alert text-left">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif