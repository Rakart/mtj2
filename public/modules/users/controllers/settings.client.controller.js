'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', '$mdToast', '$animate',
	function($scope, $http, $location, Users, Authentication, $mdToast, $animate) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};


		// Defines position of toasts on the page.
		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: false,
			right: false
		};

		// Gets toast position in required format for ShowSimpleToast()
		$scope.getToastPosition = function() {
			return Object.keys($scope.toastPosition)
				.filter(function(pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		// Defines Simple Toast settings.
		$scope.showSimpleToast = function(content) {
			$mdToast.show(
				$mdToast.simple()
					.content(content)
					.position($scope.getToastPosition())
					.hideDelay(1000)
			);
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
					$scope.showSimpleToast('Profile updated successfully!');

				}, function(response) {
					$scope.error = response.data.message;
					$scope.showSimpleToast($scope.error);
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};



	}
]);
