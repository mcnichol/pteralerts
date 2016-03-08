describe('Results controller',function(){
    var results = {
        "Search": [
            {
                'id' : 1,
                'project' : 'Project One'
            },{
                'id' : 2,
                'project' : 'Project Two'
            },{
                'id' : 3,
                'project' : 'Project Three'
            }
        ]
    };
    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var pteralertApi;

    beforeEach(module('pteralert'));
    beforeEach(module('projectApp'));

    beforeEach(inject(function(_$controller_, _$location_, _$q_, _$rootScope_,_pteralertApi_){
        $controller = _$controller_;
        $location = _$location_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = {};
        pteralertApi = _pteralertApi_;
    }));

    it('should load search results', function(){
        spyOn(pteralertApi, 'getmynotifications').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q','test');
        $controller('ResultsController', { $scope: $scope  });
        $rootScope.$apply();
        expect($scope.results[0].project).toBe(results.Search[0].project);
        expect($scope.results[1].project).toBe(results.Search[1].project);
        expect($scope.results[2].project).toBe(results.Search[2].project);
        expect(pteralertApi.getmynotifications).toHaveBeenCalledWith('test');
    });

    it('should set result status to error', function(){
        spyOn(pteralertApi, 'getmynotifications').and.callFake(function(){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q','test');
        $controller('ResultsController', {$scope: $scope});
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('Something went wrong!');
    });
});
