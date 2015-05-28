angular.module('dwQuestion')
    .factory('QuestionService', ['$http', '$q', 'apiUser', 'apiQuestions', 'apiSingleQuestion', 'apiUserGameWaiting',
        'apiUserGameNotPlayed', 'apiUserRandomOther', 'apiLaunchGame', 'apiEndGame', 'apiFinishGame', 'apiFinishTraining',
        'apiBestPlayers', 'apiGetUserTraining', 'apiGetUserOpponents', 'apiGetUserTrainingStats',
        function($http, $q, apiUser, apiQuestions, apiSingleQuestion, apiUserGameWaiting,
                 apiUserGameNotPlayed, apiUserRandomOther, apiLaunchGame, apiEndGame, apiFinishGame, apiFinishTraining,
                 apiBestPlayers, apiGetUserTraining, apiGetUserOpponents, apiGetUserTrainingStats){


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
                var deferred = $q.defer();
                $http.post(apiUserGameNotPlayed, {id: user_id})
                    .success(function(data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            };

            questionService.getUserGameNotPlayedAlt = function(user_id) {
                return $http.post(apiUserGameNotPlayed, {id: user_id});
            };

            questionService.getUserGameWaiting = function(user_id) {
                var deferred = $q.defer();
                $http.post(apiUserGameWaiting, {id: user_id})
                    .success(function(data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            };

            questionService.getUserGameWaitingAlt = function(user_id) {
                return $http.post(apiUserGameWaiting, {id: user_id});
            };

            questionService.launchGame = function(array) {
                var launch = {
                    user1_id: array.user1_id,
                    user2_id: array.user2_id,
                    questions: array.questions,
                    user1_answers: array.user1_answers
                };
                return $http.post(apiLaunchGame, launch)
                    .success(function(data, status, headers, config) {

                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.endGame = function(array) {
                var end = {
                    id: array.id,
                    user2_answers: array.user2_answers
                };
                return $http.post(apiEndGame, end)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.finishGame = function(array) {
                var finish = {
                    id: array.id,
                    user1_id: array.user1_id,
                    user2_id: array.user2_id,
                    user1_answers: array.user1_answers,
                    user2_answers: array.user2_answers
                };
                return $http.post(apiFinishGame, finish)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.endTraining = function(array) {
                var training = {
                    user_id: array.user_id,
                    questions: array.questions,
                    user_answers: array.user_answers
                };
                return $http.post(apiFinishTraining, training)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config) {
                        // TODO Do something on error
                    })
            };

            questionService.getUser = function(id) {
                return $http.get(apiUser+id)
                    .success(function(data, status, headers, config) {
                        return data.username;
                    })
                    .error(function(data, status, headers, config){
                        // TODO Do something on error
                    })
            };

            questionService.getRanking = function() {
                return $http.get(apiBestPlayers)
                    .success(function(data, status, headers, config) {
                        // TODO Do something on success ?
                    })
                    .error(function(data, status, headers, config){
                        // TODO Do something on error
                    })
            };

            questionService.getUserTraining = function(user_id) {
                var deferred = $q.defer();
                $http.post(apiGetUserTraining, {user_id: user_id})
                    .success(function(data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            };

            questionService.getUserOpponents = function(user_id) {
                var deferred = $q.defer();
                $http.post(apiGetUserOpponents, {user_id: user_id})
                    .success(function(data) {
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            };

            questionService.getUserTrainingStats = function(user_id) {
                var deferred = $q.defer();
                $http.post(apiGetUserTrainingStats, {user_id: user_id})
                    .success(function(data){
                        deferred.resolve(data);
                    }
                );
                return deferred.promise;
            };


            return questionService;
        }]);




