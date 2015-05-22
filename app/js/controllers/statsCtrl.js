angular.module('dwApp')
    .controller('StatsController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        'countTrainings', 'waitingYou', 'waitingOther', 'countOpponents', 'trainingStats',
        function ($scope, $rootScope, QuestionService, $location, FlashService,
                  countTrainings, waitingYou, waitingOther, countOpponents, trainingStats) {
            FlashService.dismiss(); // Hiding all flash message from a view to another

            $scope.countTrainings = countTrainings;

            $scope.trainingStats = trainingStats;
            console.log($scope.trainingStats[0]);

            $scope.countOpponents = countOpponents;

            $scope.waitingYou = waitingYou.length;

            $scope.waitingOther = waitingOther.length;
        }]);