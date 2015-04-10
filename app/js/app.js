angular.module('dwApp', [
    'ngRoute',
    'dwControllers', 'dw.AppCtrl',
    'dw.SessionService',
    'dw.AuthService', 'dw.QuestionsService', 'dw.AuthResolver', 'dw.AuthInterceptor',
    'dw.formAutofillFix', 'dw.loginDialog'])
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
            var authorizedRoles = next.data.authorizedRoles;
            if(!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
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


