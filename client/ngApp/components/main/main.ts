namespace BMPM.Components{
  const name='mainApp';
  const template='/client/ngApp/components/main/main.html';
  export class Main {
      public currentUser;
    constructor(
      private UserService: BMPM.Services.UserService,
      private $state: ng.ui.IStateService,

    ) {
      $state.$current.locals.globals['currentUser'].$promise
        .then((user) => {
          this.currentUser = user;
        }).catch((user) => {
          this.currentUser = user;
        });
    }

    // logout() {
    //   this.UserService.logout().then(() => {
    //     this.$state.go('main.home', null, {reload: true, notify:true});
    //   }).catch(() => {
    //     throw new Error('Unsuccessful logout');
    //   });
    // }
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
