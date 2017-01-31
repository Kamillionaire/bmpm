namespace BMPM.Components {
    const name = 'navigation';
    const template = '/client/ngApp/components/navigation/navigation.html';
    export class Navigation {
        public isAuthenticated;
        public alerts =[];
        public currentUser;
        constructor(
            private $state: ng.ui.IStateService,
            private UserService: BMPM.Services.UserService,
            private Session: BMPM.Services.Session,
            $stateParams: ng.ui.IStateParamsService
        ) {
          this.currentUser = Session.getUser();
          this.isAuthenticated = Session.isAuthenticated();
        }
        isAuthorized(roles){
          return this.Session.isAuthorized(roles);
        }
        public login(user) {

          this.UserService.login(user).then((res) => {
             this.$state.go('main.profile', {username:res.username}, {reload: true, notify:true});
          }).catch((err) => {
            this.alerts.push({type:'warning',message:'Something went awry!!, Try again!'})
          });
        }
        logout() {

            this.UserService.logout().then(() => {
                this.Session.destroy();
                this.$state.go('main.home', null, { reload: true, notify: true });
            }).catch(() => {
                throw new Error('Unsuccessful logout');
            });
        }
        delete() {

            this.UserService.deleteUser(this.Session.user).then(() => {
                this.Session.destroy();
                this.$state.go('main.home', null, { reload: true, notify: true });
            }).catch(() => {
                throw new Error('Unsuccessful logout');
            });
        }
        goToState(state:string){
          console.log(state)
          this.$state.go(state);
        }

    }
    angular.module('bmpm').component(name, {
        templateUrl: template,
        controller: BMPM.Components.Navigation,
        controllerAs: 'vm'

    })
}
