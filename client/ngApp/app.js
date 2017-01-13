var BMPM;
(function (BMPM) {
    angular.module('bmpm', ['ngResource', 'ui.router', 'ngMaterial'])
        .config(function ($resourceProvider, $stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
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
            },
            component: 'mainApp'
        })
            .state('main.home', {
            url: '/',
            template: '<boxer-list></boxer-list>',
            parent: 'main'
        })
            .state('main.login', {
            url: '/',
            template: '<login></login>',
            parent: 'main'
        }).state('main.register', {
            url: '/',
            template: '<registration></registration>',
            parent: 'main'
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('yellow')
            .backgroundPalette('cyan')
            .dark();
    })
        .run(function () { });
})(BMPM || (BMPM = {}));
