namespace BMPM.Components{
  const name='registration';
  const template='/ngApp/components/registration/registration.html';
  export class Registration {

    constructor(
      private UserService: BMPM.Services.UserService,
      private $state: ng.ui.IStateService,

    ) {
    }

    // logout() {
    //   this.UserService.logout().then(() => {
    //     this.$state.go('registration.home', null, {reload: true, notify:true});
    //   }).catch(() => {
    //     throw new Error('Unsuccessful logout');
    //   });
    // }
  }
  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Registration,
    controllerAs: 'vm'
  })
}
