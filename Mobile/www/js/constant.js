angular.module('MDC')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('BASE_URL', {
  urlservices: 'http://172.16.11.60:3000/api'
  //urlservices: 'http://localhost:3060/api/user/login'
})
.constant('WEEKDAYS',{'MONDAY':'Mo',
  'TUESDAY':'Tu',
  'WEDNESDAY':'We',
  'THURSDAY':'Th',
  'FRIDAY':'Fr',
  'SATURDAY':'Sa',
  'SUNDAY':'Su'
})

.constant('USER_ROLES', {
  user: 'user_role',
  public: 'public_role'
});