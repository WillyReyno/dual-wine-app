angular.module('dw.LoginCtrl', ['ngRoute', 'dw.QuestionsServ'])

    .controller('LoginController', ['$scope', 'Questions', function($scope, Questions) {
        $scope.question = Questions.getQuestions(function(data){
            console.log($scope.questions);

        });
    }]);
