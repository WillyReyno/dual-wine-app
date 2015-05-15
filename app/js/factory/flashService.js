angular.module('dwApplication')
    .factory('FlashService', ['Flash', function (Flash) {

        var flashService = {};

        /* Dismiss (hide all flash message) */

        flashService.dismiss = function() {
            Flash.dismiss();
        };

        /* Pause (will pause the flash message and will not dismiss) */

        flashService.pause = function() {
            Flash.pause();
        };

        /* Login */

        flashService.flashFailLogin = function() {
            var message = '<strong>Connexion échouée</strong>, votre identifiant ou votre mot de pass est erroné.';
            Flash.create('danger', message);
        };

        flashService.flashInvalidFields = function() {
            var message = 'Cette adresse e-mail est invalide.';
            Flash.create('danger', message);
        };

        flashService.flashSuccessLogin = function() {
            var message = 'Vous êtes bien connecté !';
            Flash.create('success', message);
        };

        /* Registration */

        flashService.flashFailRegister = function() {
            var message = '<strong>Echec de l\'inscription</strong>, votre identifiant ou votre adresse e-mail est probablement déjà utilisé.';
            Flash.create('danger', message);
        };

        flashService.flashSuccessRegister = function() {
            // TODO check si le message correspond à l'erreur
            var message = 'Inscription réussie, redirection en cours !';
            Flash.create('success', message);
        };

        /* Game  */

        flashService.flashError = function() {
            var message = 'Une erreur est survenue, veuillez réessayer ultèrieurement.';
            Flash.create('danger', message);
        };

        flashService.flashWinner = function(opponent) {
            var message = 'Félicitations, vous avez remporté la partie contre '+ opponent +' !';
            Flash.create('success', message);
        };

        flashService.flashLoser = function(opponent) {
            var message = 'Dommage, vous avez perdu contre '+ opponent +' !';
            Flash.create('danger', message);
        };

        flashService.flashExaequo = function(opponent) {
            var message = 'Vous êtes exaequo avec '+ opponent +' !';
            Flash.create('danger', message);
        };

        flashService.flashPending = function(opponent) {
            var message = 'En attente de '+ opponent +' !';
            Flash.create('info', message);
        };

        flashService.flashTraining = function(score) {
            var message = 'Vous avez obtenu un score de '+ score +' !';
            Flash.create('info', message);
        };

        return flashService;
    }]);


