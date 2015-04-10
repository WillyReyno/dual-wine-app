angular.module('dw.StartCtrl', ['ngRoute'])
    .controller('StartController', ['$scope', function ($scope) {
        $scope.hello = "Hello World!";
    }]);