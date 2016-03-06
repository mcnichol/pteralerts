describe('pivotal tracker service',function(){
    var ptProjectData = {'projectdata':'somedata'};

    it('should return project data', function(){
        var pteralertApi = {};

        angular.mock.module('pteralert');

        angular.mock.inject(function(_pteralertApi_){
            pteralertApi = _pteralertApi_;
        });
        expect(pteralertApi.search('project')).toEqual(ptProjectData);
    });
});
