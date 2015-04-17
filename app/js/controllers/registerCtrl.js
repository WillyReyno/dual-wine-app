angular.module('dwLogin')
    .controller('RegisterController', function($scope, $http, $rootScope, AUTH_EVENTS, AuthService) {

        $scope.credentials = {
            username: '',
            email: '',
            password: ''
        };

        $scope.submitRegisterForm = function (credentials) {

            /* Inscription de l'user */

            AuthService.register(credentials).then(function (res) {
                var usercred = res.config.data;
                delete usercred.username;

                /* Connexion de l'user */

                AuthService.login(usercred).then(function (res) {
                    if(res.data.login) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $scope.setCurrentUser(res.data.user);

                    } else {
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed)
                    }

                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });

            }, function () {

                // Todo Registration failed
            });
        };
    });

