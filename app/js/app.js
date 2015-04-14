angular.module('dwApp', [
    'ngRoute',
    'dwLogin', 'dwStart', 'dwRegister', 'dwApplication',
    'dwQuestionsService',
    'dwValues'])
    //.config(function($stateProvider, USER_ROLES) {
    //    $stateProvider.state('dashboard', {
    //        url: '/dashboard',
    //        templateUrl: 'dashboard/index.html',
    //        data: {
    //            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
    //        }
    //    });
    //    $stateProvider.state('/question:id', {
    //        url: '/question:id',
    //        resolve: {
    //            auth: function resolveAuthentication(AuthResolver) {
    //                return AuthResolver.resolve();
    //            }
    //        }
    //    })
    //})
    .run(function($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, next) {

            if(!AuthService.isAuthenticated()) {
                event.preventDefault();
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
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
                when('/question:1', {
                    templateUrl: 'partials/register.html',
                    controller: 'RegisterController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);

angular.module("dwLogin", []);
