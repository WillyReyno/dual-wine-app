angular.module('dwQuestionsService', ['ngResource'])
    .factory('QuestionFactory', ['$resource',
        function($resource){
            return $resource('http://localhost/dual-wine/public/api/question', {}, {
                query: {method:'GET', params:{limit: 4}, isArray:true}
                // Todo add a random parameter ?
            });
        }]);




