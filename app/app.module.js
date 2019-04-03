var env = {};

// Import variables if present (from env.js)
if(window){
    Object.assign(env, window.__env);
}

angular.module('storageuploadApp', [
    'ngAria',
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'ngAnimate',
    'ngMessages',
    'uiSelect',
    'caseForm',
    'deviceView',
    'serviceView',
    'templates'
])
    .config(function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true,
            rewriteLinks: true
        });
        $routeProvider
            .otherwise({
                template: '<ui-select></ui-select>'
            });
    })

