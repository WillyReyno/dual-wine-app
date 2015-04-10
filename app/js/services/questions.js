angular.module('dw.QuestionsServ', [])
    .factory('Questions', ['$http', function($http, $scope) {
        return {
            getQuestions: function(callback){
                var url = 'js/test.json';
                $http.get(url)
                    .success(function(data) {
                       $scope.questions =  data;
                    })
                    .error(function(data){
                        console.log("fail");
                    });
            }
        }
    }]);


