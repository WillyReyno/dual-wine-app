angular.module('dwApplication')
    .controller('ApplicationController', ['$scope', '$location', '$rootScope', 'FlashService',
        function($scope, $location, $rootScope, FlashService) {

            /* rootScope */
            //$rootScope.currentUser = null;

            /* Session */
            if(sessionStorage.getItem("user")) {
                var user_json = sessionStorage.getItem("user");
                $rootScope.currentUser = JSON.parse(user_json);

            } else {
                sessionStorage.setItem("user", null);
            }

            $scope.setCurrentUser = function(user) {

                if (user == null) {
                    sessionStorage.removeItem("user");
                    $rootScope.currentUser = user;
                } else {
                    sessionStorage.setItem("user", JSON.stringify(user));
                    var user_json = sessionStorage.getItem("user");
                    $rootScope.currentUser = JSON.parse(user_json);
                }
                /* rootScope */
                //$rootScope.currentUser = user;

                /* Session */

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
