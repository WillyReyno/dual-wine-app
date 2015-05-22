angular.module('dwApp')
    .controller('StatsController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService', 'countTrainings', 'waitingYou', 'waitingOther',
        function ($scope, $rootScope, QuestionService, $location, FlashService, countTrainings, waitingYou, waitingOther) {
            FlashService.dismiss(); // Hiding all flash message from a view to another

            $scope.countTrainings = countTrainings;

            //QuestionService.getUserOpponents($rootScope.currentUser.id).then(function(res){
            //    $scope.countOpponents = res.data;
            //});

            $scope.waitingYou = waitingYou.length;

            $scope.waitingOther = waitingOther.length;
        }]);