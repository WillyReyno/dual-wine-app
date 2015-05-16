angular.module('dwApp')
    .controller('RankingController', ['$scope', '$rootScope', 'QuestionService', '$location', 'FlashService',
        function ($scope, $rootScope, QuestionService, $location, FlashService) {
            FlashService.dismiss(); // Hiding all flash message from a view to another

            QuestionService.getRanking().then(function(res){
                $scope.ranking = res.data;
            });
        }]);