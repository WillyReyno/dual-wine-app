angular.module('dwLogin')
    .controller('RegisterController', function($scope, $http, $rootScope, AUTH_EVENTS, AuthService) {
        //$scope.dataquestions = QuestionFactory.query();

        $scope.credentials = {
            username: '',
            email: '',
            password: ''
        };

        $scope.submitRegisterForm = function (credentials) {
            console.log('submit !');
            AuthService.register(credentials).then(function (res) {
                console.log('yes');
                var test = res.config.data;
                console.log(test);
                //var index = test.indexOf('username');
                delete test.username;
                console.log(test);

                AuthService.login(test).then(function (res) {
                    if(res.data.login) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $scope.setCurrentUser(res.data.user);

                    } else {
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed)
                    }
                }, function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });



                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(res.data);

            }, function () {
                //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                console.log('nope');
            });
        };
    });

