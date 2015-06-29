/**
 * Created by Carlos on 29/6/15.
 */
'use strict';

angular.module('core').controller('PricingController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;

        $scope.Plans = [
            {
                name: 'Standard',
                time: '< 3 months',
                rates: '$$$',
                trial_lesson: false,
                commitment: false,
                free_book: false
            },
            {
                name: 'Superior',
                time: '3-5 months',
                rates: '$$',
                trial_lesson: true,
                commitment: true,
                free_book: true
            },
            {
                name: 'Superb',
                time: '6 months +',
                rates: '$',
                trial_lesson: true,
                commitment: true,
                free_book: true
            },
        ]
    }
]);
