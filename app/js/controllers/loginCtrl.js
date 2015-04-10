angular.module('dw.LoginCtrl', [])
    .controller('LoginController', function($scope, $http, QuestionFactory, $rootScope, AUTH_EVENTS, AuthService) {
        $scope.dataquestions = QuestionFactory.query();

        /* SESSIONS */
        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.submitLoginForm = function(credentials) {
            var url = "http://localhost/dual-wine/public/api/auth/login";
            $http.post(url, credentials)
                .success(function(data, status, headers, config){
                    if(data.login) {
                        console.log('true !');
                        AuthService.login(credentials).then(function(user){
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            $scope.setCurrentUser(user);
                        }, function() {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        })

                    } else {
                        alert("false");
                    }
                })
                .error(function(data, status, headers, config){
                    //Todo en cas d'erreur
                });


        };
    })
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

