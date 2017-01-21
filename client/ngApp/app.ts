/// <reference types="angular" />
/// <reference types="angular-resource" />
/// <reference types="angular-ui-router" />
/// <reference types="ngstorage" />

namespace BMPM {
  angular.module('bmpm', ['ngResource', 'ui.router','ngStorage'])
    .config((
      $resourceProvider: ng.resource.IResourceServiceProvider,
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider
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
          }
          // component:'mainApp'
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
        })

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
    })
    .run(() => {});
}
