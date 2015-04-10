angular.module('dw.LoginCtrl', [])
    .controller('LoginController', ['$scope', '$http', 'QuestionFactory', function($scope, $http, QuestionFactory, $rootScope, AUTH_EVENTS, AuthService) {
        $scope.dataquestions = QuestionFactory.query();



        /* SUBMITTING LOGIN FORM */
        $scope.submitLoginForm = function() {
            var dataz = $scope.fields;
            var url = "http://localhost/dual-wine/public/api/auth/login";
            $http.post(url, dataz)
                .success(function(data, status, headers, config){
                    if(data.login) {
                       // alert("true");
                        /* SESSIONS */
                        $scope.credentials = {
                            email: dataz.email,
                            password: dataz.password
                        };

                        $scope.login = function(credentials) {
                            AuthService.login(credentials).then(function(user){
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                $scope.setCurrentUser(user);
                                console.log(user);
                            }, function() {
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                            })
                        };
                        /* END SESSIONS */
                    } else {
                        alert("false");
                    }
                })
                .error(function(data, status, headers, config){
                    //Todo en cas d'erreur
                });
        };
        /* END SUBMITTING LOGIN FORM */
    }])
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

