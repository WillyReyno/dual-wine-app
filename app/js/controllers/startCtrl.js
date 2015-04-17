angular.module('dwGame')
    .controller('StartController', function ($scope, QuestionFactory) {

        $scope.dataquestions = QuestionFactory.query();

        $scope.startGame = function () {


            // Todo Call Question Factory and retrieve the 4 parameters


            console.log('start !');

        };
    });