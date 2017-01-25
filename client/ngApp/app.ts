/// <reference types="angular" />
/// <reference types="angular-resource" />
/// <reference types="angular-ui-router" />
/// <reference types="ngstorage" />

namespace BMPM {
  angular.module('bmpm', ['ngResource', 'ui.router','ngStorage', 'ui.bootstrap'])
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
        })
        .state('main.register', {
          url: '/registration',
          template: '<registration></registration>',
          parent: 'main'
        })
        .state('main.profile', {
          url: '/profile',
          template: '<profile></profile>',
          parent: 'main'
        })

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);

    })
    .factory('_', ['$window',
      function($window) {
        // place lodash include before angular
        return $window._;
      }
    ])
    .run(
      [
        '$rootScope',
        'UserService',
        '$sessionStorage',
        'Session',
        '$state',
        '_',
        'AUTH_EVENTS',
        (
          $rootScope,
          UserService,
          $sessionStorage,
          Session,
          $state: ng.ui.IStateService,
          _,
          AUTH_EVENTS
        ) => {
          $rootScope.$on('$stateChangeStart', (event, next) => {
            UserService.getCurrentUser().then((user) => {
              $sessionStorage.user = user;
              Session.user = Session.getUser();
            }).catch((user) => {
              $sessionStorage.user = user;
              Session.user = Session.getUser();
            });
            let authorizedRoles = !_.isUndefined(next.data, 'authorizedRoles')
              ? next.data.authorizedRoles : false;
            if (authorizedRoles && !Session.isAuthorized(authorizedRoles)) {
              event.preventDefault();
              if(Session.isAuthenticated()){
                //TODO dialog
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                $state.go('home');
              } else {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                $state.go('home');
              }
            }
          });
        }
      ]
    );
}
