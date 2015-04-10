angular.module('dw.QuestionsServ', [])
    .factory('Questions', ['$http',
        function($resource){
            return $resource('http://localhost/dual-wine/public/api/question', {}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }]);