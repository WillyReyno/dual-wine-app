angular.module('dwApplication')
    .controller('ApplicationController', ['$scope', '$location', '$rootScope', 'FlashService',
        function($scope, $location, $rootScope, FlashService) {
        $rootScope.currentUser = null;

        $scope.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        $scope.logout = function () {
            FlashService.dismiss();

            $scope.setCurrentUser(null);
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        }
    }]);
