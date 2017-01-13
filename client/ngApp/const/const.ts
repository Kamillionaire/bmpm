angular.module('bmpm')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('IP_INFO', '//ipinfo.io/json')
  .constant('TIMEOUTS', {
    user_resolve: 7500
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin'
  })
  // .constant('STATES',[AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS
  //   MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI
  //   WY])
