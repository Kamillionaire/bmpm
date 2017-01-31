var BMPM;
(function (BMPM) {
    angular.module('bmpm', ['ngResource', 'ui.router', 'ngStorage', 'ui.bootstrap', 'ngTable'
    ])
        .config(function ($resourceProvider, $stateProvider, $urlRouterProvider, $locationProvider, USER_ROLES) {
        $stateProvider
            .state('main', {
            url: '',
            abstract: true,
            template: '<main-app></main-app>',
            resolve: {
                currentUser: [
                    'UserService', '$state', function (UserService, $state) {
                        return UserService.getCurrentUser(function (user) {
                            return user;
                        }).catch(function (e) {
                            return { username: false };
                        });
                    }
                ]
            }
        })
            .state('main.home', {
            url: '/',
            template: '<home></home>',
            parent: 'main'
        })
            .state('main.login', {
            url: '/login',
            template: '<login></login>',
            parent: 'main'
        })
            .state('main.register', {
            url: '/registration',
            template: '<registration></registration>',
            parent: 'main'
        })
            .state('main.profile', {
            url: '/profile/:username',
            parent: 'main',
            template: '<profile profile="$resolve.profile"></profile>',
            resolve: {
                profile: function (ProfileService, $stateParams) { return ProfileService.getProfile($stateParams['username']); }
            }
        })
            .state('main.usersIndex', {
            url: '/usersIndex',
            parent: 'main',
            template: '<users-index></users-index>',
            data: {
                authorizedRoles: [USER_ROLES.admin]
            }
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    })
        .factory('_', ['$window',
        function ($window) {
            return $window._;
        }
    ])
        .run([
        '$rootScope',
        'UserService',
        '$sessionStorage',
        'Session',
        '$state',
        '_',
        'AUTH_EVENTS',
        function ($rootScope, UserService, $sessionStorage, Session, $state, _, AUTH_EVENTS) {
            $rootScope.$on('$stateChangeStart', function (event, next) {
                UserService.getCurrentUser().then(function (user) {
                    $sessionStorage.user = user;
                    Session.user = Session.getUser();
                }).catch(function (user) {
                    $sessionStorage.user = user;
                    Session.user = Session.getUser();
                });
                var authorizedRoles = !_.isUndefined(next.data, 'authorizedRoles')
                    ? next.data.authorizedRoles : false;
                if (authorizedRoles && !Session.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    if (Session.isAuthenticated()) {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        $state.go('home');
                    }
                    else {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        $state.go('home');
                    }
                }
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
            });
        }
    ]);
})(BMPM || (BMPM = {}));
