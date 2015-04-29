angular.module('dwAuth')
    .controller('RegisterController', ['$scope', '$http', '$rootScope', 'AuthService', 'Flash',
        function($scope, $http, $rootScope, AuthService, Flash) {

            $scope.failRegister = function() {
                var message = '<strong>Echec de l\'inscription</strong>, votre identifiant ou votre adresse e-mail est probablement déjà utilisé.';
                Flash.create('danger', message);
            };

            $scope.successRegister = function() {
                var message = 'Inscription réussie !';
                Flash.create('success', message);
            };
            


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
                        $scope.successRegister();
                        $scope.setCurrentUser(res.data.user);

                    } else {
                        $scope.failRegister(); // register failed
                    }

                }, function () {
                    $scope.failRegister(); // cant access API login
                });

            }, function () {
                $scope.failRegister(); // Cant access API register
            });
        };
    }]);

