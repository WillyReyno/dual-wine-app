angular.module('dwLogin')
    .service('Session', function() {
        this.create = function(userId) {
           this.userId = userId;
        };

        this.destroy = function() {

        };
    });


