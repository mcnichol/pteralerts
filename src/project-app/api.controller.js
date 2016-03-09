angular.module('projectApp',[]).
    controller('ApiController',function($scope,$http){
        $scope.findme = function(){
            $http({method:'GET',url:'/api/me'}); 
            //Load data into UI on response
        }; 
    });
