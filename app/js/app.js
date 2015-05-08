angular.module('dwApp', [
    'ngRoute',
    'dwAuth', 'dwGame', 'dwApplication',
    'dwQuestion',
    'dwValues', 'flash'])
    .run(function($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if(!AuthService.isAuthenticated()) {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated); // TODO Fail login - et voir si ça sert à qqchose.
            }
        });
    })
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
                    templateUrl: 'partials/home.html',
                    controller: 'LoginController'
                }).
                when('/start', {
                    templateUrl: 'partials/start.html',
                    controller: 'StartController'
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
                if ( next.templateUrl == "partials/login.html" ) {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path( "/login" );
                }
            }
        });
    });

angular.module("dwApplication", []);
angular.module("dwAuth", []);
angular.module("dwGame", []);
angular.module("dwQuestion", []);
