angular.module('projectApp')
    .controller('SearchController',function($scope,$location){
        $scope.search = function(){
            if($scope.query){
                $location.path('/location').search('q',$scope.query);
            }
        }
    });
