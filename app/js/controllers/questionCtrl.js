angular.module('dwGame')
    .controller('QuestionController', function($scope, $http, QuestionFactory, $rootScope) {
        $scope.dataquestions = QuestionFactory.query();

        $scope.getQuestions = function() {

        }
    });

