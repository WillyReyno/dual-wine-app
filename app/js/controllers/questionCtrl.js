angular.module('dwGame')
    .controller('QuestionController', function($scope, $http, QuestionFactory, $rootScope) {
        $scope.dataquestions = QuestionFactory.query();
        console.log($scope.dataquestions);
        $scope.getQuestions = function() {
            console.log('here they are !')
        }
    });

