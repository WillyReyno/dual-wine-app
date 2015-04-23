angular.module('dwValues', [])
    .value('apiLogin', 'http://localhost/dual-wine/public/api/auth/login') // post
    .value('apiRegister', 'http://localhost/dual-wine/public/api/user') // post
    .value('apiUserUpdate', 'http://localhost/dual-wine/public/api/user') // put
    .value('apiQuestions', 'http://localhost/dual-wine/public/api/question/random') // get
    .value('apiSingleQuestion', 'http://localhost/dual-wine/public/api/question/') //get + id
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });