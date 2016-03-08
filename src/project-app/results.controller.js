angular.module('projectApp')
    .controller('ResultsController',function($scope,$location, pteralertApi){
        var query = $location.search().q;
        pteralertApi.getmynotifications(query)
            .then(function(data){
                $scope.results = data.Search;
            })
            .catch(function(){
                $scope.errorMessage = 'Something went wrong!';
            });
    });
