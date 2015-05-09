angular.module('dwAuth')
    .directive('loginDialog', function(AUTH_EVENTS) {
        return {
            restrict:'A',
            template: '<div ng-if="visible" ng-include="\'login-form.html\'">',
            link: function(scope) {
                var showDialog = function() {
                    scope.visible = true;
                };

                scope.visible = false;
                // TODO Error login / voir si ça sert à qqchose.
                scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
            }
        };
    });