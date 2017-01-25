namespace BMPM.Components{
  const name='login';
  const template='/client/ngApp/components/login/login.html';
  export class Login {
    public user;
    public alerts =[];

    constructor(
      private UserService: BMPM.Services.UserService,
      private $state: ng.ui.IStateService,
      private Session: BMPM.Services.Session
    ) {
    }

    public login(user) {
      this.UserService.login(user).then((res) => {
         this.$state.go('main.profile', {username:res.username}, {reload: true, notify:true});
      }).catch((err) => {
        this.alerts.push({type:'warning',message:'Something went awry!!, Try again!'})
      });
    }
    close (i){
      this.alerts.splice(i,1);
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
