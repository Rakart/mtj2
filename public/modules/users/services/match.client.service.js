'use strict';

// MatchService service for storing favourite tutors of a specific user.
angular.module('users').factory('MatchService', [ '$resource', 'Users',
	function($resource, Users) {
		var resource;

		resource = $resource('/users', null, {
			listUsers: {
				method: 'GET',
				isArray: true
			}
		});

		return resource;
	}
]);

