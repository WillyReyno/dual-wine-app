angular.module('ui.gravatar').config([
    'gravatarServiceProvider', function(gravatarServiceProvider) {
        gravatarServiceProvider.defaults = {
            size     : 100,
            "default": 'mm'
        };

        gravatarServiceProvider.secure = true;
    }
]);