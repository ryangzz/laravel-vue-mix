# Laravel Scaffold project
It includes examples of tests (login), how to use permissions (User module), seeders for permissions, admin template.
The scaffold also includes vue for front end

# Packages
    - spatie/laravel-permission
    - ibex/crud-generator

## Switch to JS
    - Change mix.ts('resources/js/app.ts', 'public/js') to mix.js('resources/js/app.js', 'public/js') in "webpack.mix.js"
    - rename app.ts to app.js
    - npm uninstall ts-loader typescript @vue/compat @vue/compiler-sfc
    - delete ts.config.json shims-vue.d.ts
    - Change Example component to a JS Syntax

