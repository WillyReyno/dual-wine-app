angular.module('dwAuth')
    .controller('LoginController', function($scope, $http, $rootScope, AUTH_EVENTS, AuthService) {


        /* SESSIONS */
        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.submitLoginForm = function (credentials) {
            AuthService.login(credentials).then(function (res) {
                if(res.data.login) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(res.data.user);

                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed)
                }
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    });

