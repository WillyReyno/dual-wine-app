angular.module('dwGame')
    .controller('StartController', function ($scope, QuestionFactory, $location) {





        $scope.startGame = function () {
            $location.path('/question/1');
            $scope.dataquestions = QuestionFactory.query();

            console.log($scope.dataquestions);

            console.log('start !');

        };
    });