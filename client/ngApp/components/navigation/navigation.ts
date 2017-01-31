namespace BMPM.Components {
    const name = 'navigation';
    const template = '/client/ngApp/components/navigation/navigation.html';
    export class Navigation {
        public isAuthenticated;
        constructor(
            private $state: ng.ui.IStateService,
            private UserService: BMPM.Services.UserService,
            private Session: BMPM.Services.Session,
            $stateParams: ng.ui.IStateParamsService
        ) {
          this.isAuthenticated = Session.isAuthenticated();
        }
        isAuthorized(roles){
          return this.Session.isAuthorized(roles);
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
