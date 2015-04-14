angular.module('dw.SessionService', [])
    .service('Session', function() {
        this.create = function(userId) {
            //this.id = sessionId;
            this.userId = userId;
        };

        this.destroy = function(){
            this.userId = null;
        };
    });


