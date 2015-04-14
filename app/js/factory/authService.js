angular.module('dw.AuthService', [])
    .factory('AuthService', function ($http, Session, apiLogin) {
    // TODO COMMENT Faudra bien regarder son tuto pour voir ce qu'on fait de ce Session, quand on le détruit, etc (et je pense qu'on reste pas co du coup
        //TODO c'est dommage _! Je te laisse revérifier ça
        var authService = {};
        this.apiLogin = apiLogin;
        console.log(apiLogin);
        authService.login = function (credentials) {

            return $http.post(apiLogin, credentials)
                .success(function(data, status, headers, config) {
                    if(data.login) {
                        Session.create(data.user.id);
                         return data.user;
                    } else {
                        //TODO  afficher une div ng-hide avec "erreur password/username"
                    }
                })
                .error(function(data, status, headers, config){
            //TODO en cas d'erreur => afficher une div ng-hide avec "erreur lors de l'envoi de vos identifiants"
                })
            };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        return authService;
    });


