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
          template: '<boxer-list></boxer-list>'
        })
        .state('main.login', {
          url: '/',
          template: '<login></login>'
        }).state('main.register', {
          url: '/',
          template: '<registration></registration>'
        })

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
      $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('orange')
        .backgroundPalette('pink')
        .dark();
    })
    .run(() => {});
}
