namespace BMPM.Components{
  const name='mainApp';
  const template='/client/ngApp/components/main/main.html';
  export class Main {
      public currentUser;
    constructor(
      private UserService: BMPM.Services.UserService,
      private $state: ng.ui.IStateService,

    ) {

    }
  }
  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Main,
    controllerAs: 'vm',
    bindings: {
      currentUser:'<'
    }
  })
}
