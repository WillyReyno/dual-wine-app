angular.module('dwQuestion')
    .factory('QuestionFactory', ['$http', 'apiQuestions', 'apiSingleQuestion',
        function($http, apiQuestions, apiSingleQuestion){
            var questionFactory = {};

            questionFactory.getQuestions = function() {
                return $http.get(apiQuestions)
                    .success(function(data, status, headers, config) {
                        console.log("success"); // TODO delete all fours
                    })
                    .error(function(data, status, headers, config){
                        console.log("error")
                    })
            };

            questionFactory.getSingleQuestion = function(id) {
                return $http.get(apiSingleQuestion+id)
                    .success(function(data, status, headers, config) {
                        console.log("success");
                    })
                    .error(function(data, status, headers, config) {
                        console.log("error");
                    })
            };

            return questionFactory;
        }]);




