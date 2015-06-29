/**
 * Created by Carlos on 28/6/15.
 */
'use strict';

angular.module('users').controller('JungleController', ['$scope', '$http', '$location', 'Authentication', 'Users',
    function($scope, $http, $location, Authentication, Users) {

        // Check for logged-in
        this.authentication = Authentication;

        // Get the list of Users from mongodb
        this.users = Users.query();

        console.log();

        // Navigates through the tutors available.
        $scope.selected = 0;

        this.nextUser = function(selected) {

            if (selected === this.users.length - 1 ) {
                $scope.selected = 0;
            } else {
                $scope.selected = selected + 1;
            }
        };

    }
]);
