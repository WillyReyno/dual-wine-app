angular.module('dwQuestion')
    .factory('QuestionService', ['$http', 'apiQuestions', 'apiSingleQuestion',
        function($http, apiQuestions, apiSingleQuestion){
            var questionService = {};

            questionService.getQuestions = function() {
                return $http.get(apiQuestions)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config){
                        // TODO Do something on error
                    })
            };

            questionService.getSingleQuestion = function(id) {
                return $http.get(apiSingleQuestion+id)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            return questionService;
        }]);




