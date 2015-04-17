angular.module('dwLogin')
    .factory('AuthService', function ($http, Session, apiLogin, apiRegister, $location) {
        // TODO COMMENT Faudra bien regarder son tuto pour voir ce qu'on fait de ce Session, quand on le détruit, etc (et je pense qu'on reste pas co du coup
        //TODO c'est dommage _! Je te laisse revérifier ça
        var authService = {};
        this.apiLogin = apiLogin;

        authService.login = function (credentials) {

            return $http.post(apiLogin, credentials)
                .success(function(data, status, headers, config) {
                    if(data.login == true) {
                        $location.path('/start');
                    } else {
                        // Todo réussir à retourner une variable pour le ng-hide
                    }
                })
                .error(function(data, status, headers, config){
                    console.log("erreur");
                    //TODO en cas d'erreur => afficher une div ng-hide avec "erreur lors de l'envoi de vos identifiants"
                })
        };

        authService.register = function(crendentials) {
            return $http.post(apiRegister, crendentials)
                .success(function(data, status, headers, config) {
                    console.log('success');
                    console.log(data);
                    $location.path('/start');
                })
                .error(function(data, status, headers, config) {
                    console.log('error');
                    console.log(data);
                })
        }

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        return authService;
    });


