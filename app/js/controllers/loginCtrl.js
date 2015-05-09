angular.module('dwAuth')
    .controller('LoginController', ['$scope', '$http', '$rootScope', 'AuthService', 'FlashService', function($scope, $http, $rootScope, AuthService, FlashService) {

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.submitLoginForm = function (credentials) {
            AuthService.login(credentials).then(function (res) {
                if(res.data.login) {
                    FlashService.flashSuccessLogin();
                    $scope.setCurrentUser(res.data.user);

                } else {
                    FlashService.flashFailLogin();
                }
            }, function () {
                FlashService.flashInvalidFields();
            });
        };
    }]);

