angular.module('projectCore', ['ngResource'])
	.factory('Projects', function($resource) {
        var token = 'MY_PT_API_TOKEN';
		return $resource('project/:projectId', { projectId: '@id' }, {
			update: {
				method: 'PUT',
                headers: {'X-TrackerToken': token}
			},
            get: {
				method: 'GET',
                headers: {'X-TrackerToken': token}
			},
            query: {
				method: 'GET',
                headers: {'X-TrackerToken': token}
			},
            save: {
				method: 'POST',
                headers: {'X-TrackerToken': token}
			},
            remove: {
				method: 'DELETE',
                headers: {'X-TrackerToken': token}
			},
        });
	});

