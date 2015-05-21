angular.module('dwApp')
    .controller('StatsController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        function ($scope, $rootScope, QuestionService, $location, FlashService) {
            FlashService.dismiss(); // Hiding all flash message from a view to another

            //QuestionService.getUserOpponents($rootScope.currentUser.id).then(function(res){
            //    $scope.countOpponents = res.data;
            //});

            QuestionService.getUserTraining($rootScope.currentUser.id).then(function(res){
                $scope.countTrainings = res.data;
            });

            QuestionService.getUserGameNotPlayed($rootScope.currentUser.id).then(function(res) {
                $scope.waitingYou = res.data.length;
            });

            QuestionService.getUserGameWaiting($rootScope.currentUser.id).then(function(res) {
                $scope.waitingOther = res.data.length;
            });
        }]);