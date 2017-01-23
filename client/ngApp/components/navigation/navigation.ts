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
        logout() {

            this.UserService.logout().then(() => {
                this.Session.destroy();
                this.$state.go('main.home', null, { reload: true, notify: true });
            }).catch(() => {
                throw new Error('Unsuccessful logout');
            });
        }

    }
    angular.module('bmpm').component(name, {
        templateUrl: template,
        controller: BMPM.Components.Navigation,
        controllerAs: 'vm'

    })
}
