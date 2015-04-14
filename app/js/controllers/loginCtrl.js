angular.module('dw.LoginCtrl', [])
    .controller('LoginController', function($scope, $http, QuestionFactory, $rootScope, AUTH_EVENTS, AuthService) {
        $scope.dataquestions = QuestionFactory.query();

        /* SESSIONS */
        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.submitLoginForm = function (credentials) {
            AuthService.login(credentials).then(function (res) { // je n'arrive pas à récupérer user, uniquement les data..
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

