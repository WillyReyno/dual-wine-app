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
    })
    //TODO : les constantes ne doivent pas se trouver dans le controller !! Je t'ai crée un dossier et un fichier value (tu peux le renommer)
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    });

