var BMPM;
(function (BMPM) {
    angular.module('bmpm', ['ngResource', 'ui.router'])
        .config(function ($resourceProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
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
        }).state('main.register', {
            url: '/registration',
            template: '<registration></registration>',
            parent: 'main'
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    })
        .run(function () { });
})(BMPM || (BMPM = {}));
