namespace BMPM.Components{
    const name='profile';
    const template ='/client/ngApp/components/profile/profile.html';
    export class Profile {
        public currentUser;
      constructor(
        private UserService: BMPM.Services.UserService,
        private $state: ng.ui.IStateService,
        Session
      ) {
        this.currentUser = Session.getUser()
        }

        logout() {
          this.UserService.logout().then(() => {
            this.$state.go('main.home', null, {reload: true, notify:true});
          }).catch(() => {
            throw new Error('Unsuccessful logout');
          });
            }
    };

  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Profile,
    controllerAs: 'vm'

  });
};
