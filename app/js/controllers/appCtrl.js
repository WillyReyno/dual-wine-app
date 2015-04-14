angular.module('dw.AppCtrl', ['dw.AuthService'])
    .controller('ApplicationController', function($scope, Session) {
        $scope.currentUser = null;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };

        $scope.logout = function () {
            // TODO not working
            Session.destroy();
        };
    });
