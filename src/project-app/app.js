angular.module('projectApp',['ui.bootstrap','ngRoute','pteralert'])
    .config(function($routeProvider){
        $routeProvider
            .when('/location',{
                templateUrl: 'project-app/results.html',
                controller: 'SearchController'
            }).
            otherwise({
                redirectTo: '/'
            });
    });
    
