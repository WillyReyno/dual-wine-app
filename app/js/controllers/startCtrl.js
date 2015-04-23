angular.module('dwGame')
    .controller('StartController', function ($scope, $rootScope, QuestionFactory, $location) {
        $scope.startGame = function () {
            QuestionFactory.getQuestions().then(function(res) {
                var i = 0;
                var currentId = 0;
                if(i == 0) {
                    currentId = res.data[0].id;
                    i++;
                    $rootScope.firstQuestion = res.data[0];
                    $rootScope.secondQuestion = res.data[1];
                    $rootScope.thirdQuestion = res.data[2];
                    $rootScope.fourthQuestion = res.data[3];
                } else if (i == 1) {
                    currentId = res.data[1].id;
                    i++;
                } else if (i == 2) {
                    currentId = res.data[2].id;
                    i++;
                } else if (i == 3) {
                    currentId = res.data[3].id;
                    i++;
                } else {
                    // end
                }

                $location.path('/question/'+currentId);

                QuestionFactory.getSingleQuestion(currentId).then(function(res) {
                    $rootScope.currentQuestion = res.data;
                });

            }, function () {
                // fail
            });
        };
    });