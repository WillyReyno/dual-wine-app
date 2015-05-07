angular.module('dwQuestion')
    .factory('QuestionService', ['$http', 'apiQuestions', 'apiSingleQuestion', 'apiUserGameWaiting', 'apiUserGameNotPlayed', 'apiUserRandomOther',
        function($http, apiQuestions, apiSingleQuestion, apiUserGameWaiting, apiUserGameNotPlayed, apiUserRandomOther){
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

            questionService.getRandomOtherUser = function(user_id) {
                return $http.post(apiUserRandomOther, {id: user_id})
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.getUserGameNotPlayed = function(user_id) {
                return $http.post(apiUserGameNotPlayed, user_id)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.getUserGameWaiting = function(user_id) {
                return $http.post(apiUserGameWaiting, user_id)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.sendResults = function(array) {
                return $http.post('inserer value de l\'API', array)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            return questionService;
        }]);




