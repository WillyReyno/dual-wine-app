angular.module('dwValues', [])
    .value('apiLogin', 'http://localhost/dual-wine/public/api/auth/login') // post
    .value('apiRegister', 'http://localhost/dual-wine/public/api/user') // post
    .value('apiUser', 'http://localhost/dual-wine/public/api/user/') // get
    .value('apiUserUpdate', 'http://localhost/dual-wine/public/api/user') // put
    .value('apiQuestions', 'http://localhost/dual-wine/public/api/question/random') // get
    .value('apiSingleQuestion', 'http://localhost/dual-wine/public/api/question/') //get + id
    .value('apiUserGameNotPlayed', 'http://localhost/dual-wine/public/api/game/getUserGameNotPlayed') // post
    .value('apiUserGameWaiting', 'http://localhost/dual-wine/public/api/game/getUserGameWaiting') // post
    .value('apiUserRandomOther', 'http://localhost/dual-wine/public/api/user/randomOther') // post
    .value('apiLaunchGame', 'http://localhost/dual-wine/public/api/game/launchGame')
    .value('apiEndGame', 'http://localhost/dual-wine/public/api/game/endGame')
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });