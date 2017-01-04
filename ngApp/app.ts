namespace chThreeApp {
  angular.module('ch-three-app', ['ngResource', 'ui.router', 'ngMaterial'])
    .config((
      $resourceProvider: ng.resource.IResourceServiceProvider,
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider,
      $mdThemingProvider: angular.material.IThemingProvider
    ) => {
      $stateProvider
        .state('home', {
          url: '/',
          template: '<boxer-list></boxer-list>'
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
