namespace BMPM {
  angular.module('bmpm', ['ngResource', 'ui.router', 'ngMaterial'])
    .config((
      $resourceProvider: ng.resource.IResourceServiceProvider,
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider,
      $mdThemingProvider: angular.material.IThemingProvider
    ) => {
      $stateProvider
        .state('main', {
          url: '',
          abstract: true,
          template: '<main-app></main-app>',
          resolve: {
            currentUser: [
              'UserService', '$state', (UserService, $state) => {
                return UserService.getCurrentUser((user) => {
                  return user;
                }).catch((e) => {
                  return { username: false };
                });
              }]
          },
          component:'mainApp'
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
        })

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('yellow')
        .backgroundPalette('cyan')
        .dark();
    })
    .run(() => {});
}
