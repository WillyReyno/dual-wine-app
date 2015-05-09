angular.module('dwApplication')
    .controller('ApplicationController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
        $rootScope.currentUser = null;

        $scope.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        $scope.logout = function () {
            $scope.setCurrentUser(null);
            $location.path('/login');
        };
    }]);
