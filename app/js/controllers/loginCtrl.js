angular.module('dwAuth')
    .controller('LoginController', ['$scope', '$http', '$rootScope', 'AuthService', 'Flash', function($scope, $http, $rootScope, AuthService, Flash) {

        $scope.failLogin = function() {
            var message = '<strong>Connexion échouée</strong>, votre identifiant ou votre mot de pass est erroné.';
            Flash.create('danger', message);
        };

        $scope.invalidFields = function() {
            var message = 'Cette adresse e-mail est invalide.';
            Flash.create('danger', message);
        };

        $scope.successLogin = function() {
            var message = 'Vous êtes bien connecté !';
            Flash.create('success', message);
        };

        /* SESSIONS */
        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.submitLoginForm = function (credentials) {
            AuthService.login(credentials).then(function (res) {
                if(res.data.login) {
                    $scope.successLogin();
                    $scope.setCurrentUser(res.data.user);

                } else {
                   $scope.failLogin();
                }
            }, function () {
               $scope.invalidFields();
            });
        };
    }]);

