namespace BMPM.Components{
  const name='login';
  const template='/client/ngApp/components/login/login.html';
  export class Login {
    public user;
    constructor(
      private UserService: BMPM.Services.UserService,
      private $state: ng.ui.IStateService,
      private Session: BMPM.Services.Session
    ) {
    }
    public registration(user) {
      this.UserService.login(user).then((res) => {
      this.Session.create(Registration)
        this.$state.go('main.home', null, {reload: true, notify:true});
      }).catch((err) => {
        alert('Bunk login, please try again.');
      });
    }
    public login(user) {
      console.log(user)
      this.UserService.login(user).then((res) => {
         this.$state.go('main.home', null, {reload: true, notify:true});
      }).catch((err) => {
        alert('Bunk login, please try again.');
      });
    }
    logout() {
      this.UserService.logout().then(() => {
        this.$state.go('main.home', null, {reload: true, notify:true});
      }).catch(() => {
        throw new Error('Unsuccessful logout');
      });
    }
  }
  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Login,
    controllerAs: 'vm'

  })
}
