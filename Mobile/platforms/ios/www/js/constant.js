angular.module('GetARide')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('BASE_URL', {
  productionUrl: 'http://gar-services.15.209.120.137.xip.io/api',
  developmentUrl: 'localhost'
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