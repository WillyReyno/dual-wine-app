angular.module('dw.AuthService', [])
    .factory('AuthService', function ($http, Session) { // COMMENT Faudra bien regarder son tuto pour voir ce qu'on fait de ce Session, quand on le détruit, etc (et je pense qu'on reste pas co du coup
        //c'est dommage _! Je te laisse revérifier ça
        var authService = {};
        var url = "http://localhost/dual-wine/public/api/auth/login"; //TODO : à mettre dans une constante du module
        authService.login = function (credentials) {
            return $http.post(url, credentials)
                .success(function(data, status, headers, config) {
                    if(data.login) {
                        // premier paramètre : sert à quoi ?
                        Session.create(data.user.id, data.user.id,
                         data.user.role);
                        console.log(Session);
                         return data.user;
                    } else {
                        // afficher une div ng-hide avec "erreur password/username"
                    }
                })
                .error(function(data, status, headers, config){
            //Todo en cas d'erreur => afficher une div ng-hide avec "erreur lors de l'envoi de vos identifiants"
                })
            };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    });


