angular.module('dwQuestionsService', ['ngResource'])
    .factory('QuestionFactory', ['$resource', 'apiQuestions',
        function($resource, apiQuestions){
            return $resource(apiQuestions, {}, {
                query: {method:'GET', params:{limit: 4}, isArray:true}
                // Todo add a random parameter ?
            });
        }]);




