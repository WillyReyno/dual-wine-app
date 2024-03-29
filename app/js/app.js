angular.module('dwApp', [
    'ngRoute',
    'dwAuth', 'dwGame', 'dwApplication',
    'dwQuestion',
    'dwValues', 'flash', 'ui.gravatar',
    'dwTest'])
    .config(function($httpProvider){
        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html'
                }).
                when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                }).
                when('/register', {
                    templateUrl: 'partials/register.html',
                    controller: 'RegisterController'
                }).
                when('/question/:id', {
                    templateUrl: 'partials/question.html',
                    controller: 'StartController'
                }).
                when('/stats', {
                    templateUrl: 'partials/stats.html',
                    resolve: {
                        countTrainings: function($rootScope, QuestionService) {
                            return QuestionService.getUserTraining($rootScope.currentUser.id);
                        },
                        countOpponents: function($rootScope, QuestionService) {
                            return QuestionService.getUserOpponents($rootScope.currentUser.id);
                        },
                        waitingYou: function($rootScope, QuestionService) {
                            return QuestionService.getUserGameNotPlayed($rootScope.currentUser.id);
                        },
                        waitingOther: function($rootScope, QuestionService) {
                            return QuestionService.getUserGameWaiting($rootScope.currentUser.id);
                        },
                        trainingStats: function($rootScope, QuestionService) {
                            return QuestionService.getUserTrainingStats($rootScope.currentUser.id);
                        }
                    },
                    controller: 'StatsController'
                }).
                when('/ranking', {
                    templateUrl: 'partials/ranking.html',
                    controller: 'RankingController'
                }).
                otherwise({
                    redirectTo: '/login'
                });
        }
    ])
    .run( function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if ( $rootScope.currentUser == null ) {
                // no logged user, we should be going to #login
                var part = ["partials/login.html", "partials/register.html"];
                var ques = ["partials/question.html"];
                if (part.indexOf(next.templateUrl) !== -1) {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path( "/" );
                }
            }
        });
    });

angular.module("dwApplication", []);
angular.module("dwAuth", []);
angular.module("dwGame", []);
angular.module("dwQuestion", []);
angular.module("dwTest", []);
