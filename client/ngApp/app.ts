/// <reference types="angular" />
/// <reference types="angular-resource" />
/// <reference types="angular-ui-router" />
/// <reference types="ngstorage" />

namespace BMPM {
  angular.module('bmpm', ['ngResource', 'ui.router','ngStorage', 'ui.bootstrap','ngTable'
])
    .config((
      $resourceProvider: ng.resource.IResourceServiceProvider,
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider,
      USER_ROLES
      
    ) => {
      $stateProvider
        .state('main', {
          url: '',
          abstract: true,
          template: '<main-app></main-app>',
            resolve: {
            currentUser: ['Session', (Session) => {
              return Session.getUser();
            }],
            isAuthenticated: ['Session', (Session) => {
              return Session.isAuthenticated();
            }],
            currentNavItem: ['$state', ($state) => {
              return $state.current.name;
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
          url: '/profile/:username',
          parent: 'main',
          template: '<profile profile="$resolve.profile"></profile>',
          resolve: {
            profile: (ProfileService, $stateParams) => ProfileService.getProfile($stateParams['username'])
          }

        })
        .state('main.usersIndex', {
          url: '/usersIndex',
          parent: 'main',
          template: '<users-index></users-index>',
          data:{
            authorizedRoles:[USER_ROLES.admin]
          }

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
         $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
         // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
          event.preventDefault();

         })
        }
      ]
    );
}
