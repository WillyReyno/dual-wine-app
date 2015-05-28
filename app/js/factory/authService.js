angular.module('dwAuth')
    .factory('AuthService', ['$http', 'Session', 'apiLogin', 'apiRegister', '$location', function ($http, Session, apiLogin, apiRegister, $location) {
        var authService = {};
        this.apiLogin = apiLogin;

        authService.login = function (credentials) {

            return $http.post(apiLogin, credentials)
                .success(function(data, status, headers, config) {
                    if(data.login == true) {
                        $location.path('/');
                    } else {
                        // Todo réussir à retourner une variable pour le ng-hide
                    }
                })
                .error(function(data, status, headers, config) {
                    //TODO Mettre un message Flash d'erreur générique ?
                })
        };

        authService.register = function(crendentials) {
            return $http.post(apiRegister, crendentials)
                .success(function(data, status, headers, config) {
                    $location.path('/');
                })
                .error(function(data, status, headers, config) {
                    // ?
                })
        };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        return authService;
    }]);


