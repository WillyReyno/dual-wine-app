angular.module('dwAuth')
    .controller('RegisterController', ['$scope', '$http', '$rootScope', 'AuthService', 'FlashService',
        function($scope, $http, $rootScope, AuthService, FlashService) {

            /* Credentials */

            $scope.credentials = {
                username: '',
                email: '',
                password: ''
            };

            $scope.submitRegisterForm = function (credentials) {

                /* User registration */

                AuthService.register(credentials).then(function (res) {
                    var usercred = res.config.data;
                    delete usercred.username;

                    /* User login */

                    AuthService.login(usercred).then(function (res) {
                        if(res.data.login) {
                            FlashService.flashSuccessRegister();
                            $scope.setCurrentUser(res.data.user);

                        } else {
                            FlashService.flashFailRegister(); // register failed
                        }

                    }, function () {
                        FlashService.flashFailRegister(); // cant access API login
                    });

                }, function () {
                    FlashService.flashFailRegister(); // Cant access API register
                });
            };
        }]);

