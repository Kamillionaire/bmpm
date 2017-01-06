namespace BMPM.Components{
  const name='registration';
  const template='/ngApp/components/registration/registration.html';
  export class Registration {
  states= ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ')
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
