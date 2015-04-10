angular.module('dw.LoginCtrl', ['ngRoute'])

    .controller('LoginController', function ($scope, $http) {
        $http.get('http://localhost/dual-wine/public/api/question').
            success(function(data, status, headers, config){
                $scope.posts = data;
            }).
            error(function(data, status, headers, config){
               // Error.
            });

    });
