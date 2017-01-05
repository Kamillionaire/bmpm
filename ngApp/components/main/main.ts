namespace BMPM.Components{
  const name='mainApp';
  const template='/ngApp/components/main/main.html';
  export class Main {
  
    constructor(
      private UserService: BMPM.Services.UserService,
      private $state: ng.ui.IStateService,

    ) {
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
