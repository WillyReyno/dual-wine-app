angular.module('dwValues', [])
    .value('apiLogin', 'http://dualwine.alexandretobia.fr/api/auth/login') // post
    .value('apiRegister', 'http://dualwine.alexandretobia.fr/api/user') // post
    .value('apiUser', 'http://dualwine.alexandretobia.fr/api/user/') // get
    .value('apiUserUpdate', 'http://dualwine.alexandretobia.fr/api/user') // put
    .value('apiQuestions', 'http://dualwine.alexandretobia.fr/api/question/random') // get
    .value('apiSingleQuestion', 'http://dualwine.alexandretobia.fr/api/question/') //get + id
    .value('apiUserGameNotPlayed', 'http://dualwine.alexandretobia.fr/api/game/getUserGameNotPlayed') // post
    .value('apiUserGameWaiting', 'http://dualwine.alexandretobia.fr/api/game/getUserGameWaiting') // post
    .value('apiUserRandomOther', 'http://dualwine.alexandretobia.fr/api/user/randomOther') // post
    .value('apiLaunchGame', 'http://dualwine.alexandretobia.fr/api/game/launchGame') // post
    .value('apiEndGame', 'http://dualwine.alexandretobia.fr/api/game/endGame') // post
    .value('apiFinishGame', 'http://dualwine.alexandretobia.fr/api/game/finishGame') // post
    .value('apiFinishTraining', 'http://dualwine.alexandretobia.fr/api/game/finishTraining') // post
    .value('apiBestPlayers', 'http://dualwine.alexandretobia.fr/api/game/bestPlayers') // get
    .value('apiGetUserTraining', 'http://dualwine.alexandretobia.fr/api/game/getUserTraining') // post
    .value('apiGetUserOpponents', 'http://dualwine.alexandretobia.fr/api/game/getUserOpponents') // post
    .value('apiGetUserTrainingStats', 'http://dualwine.alexandretobia.fr/api/game/getUserTrainingStats') // post
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });