angular.module('dwApplication', [])
    .controller('ApplicationController', function($scope, $location) {
        $scope.currentUser = null;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };

        $scope.logout = function () {
            $scope.setCurrentUser(null);
            $location.path('/login');
        };
    });
