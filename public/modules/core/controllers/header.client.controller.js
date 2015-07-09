'use strict';

angular.module('core')
	.controller('HeaderController', ['$scope', 'Authentication',
		'Menus',
		'$state',
		'$http',
		'$location',
		'$timeout',
		'$mdSidenav',
		'$mdUtil',
		'$log',
	function($scope, Authentication, Menus, $state, $http, $location, $timeout, $mdSidenav, $mdUtil, $log) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.navigate = function(routeName){
			$state.go(routeName);
		};

		$scope.logout = function() {
			$http.get('/auth/signout').success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = null;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};



		function buildToggler(navID) {
			var debounceFn =  $mdUtil.debounce(function(){
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						$log.debug('toggle ' + navID + ' is done');
					});
			},300);
			return debounceFn;
		}

		$scope.toggleLeft = buildToggler('left');
		
		$scope.close = function() {
			$mdSidenav('left').close()
				.then(function () {
					$log.debug('close LEFT is done');
				});
		};

	}]);
