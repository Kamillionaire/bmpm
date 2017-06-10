var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        const name = 'navigation';
        const template = '/client/ngApp/components/navigation/navigation.html';
        class Navigation {
            constructor($state, UserService, Session, $stateParams) {
                this.$state = $state;
                this.UserService = UserService;
                this.Session = Session;
                this.alerts = [];
                this.currentUser = Session.getUser();
                this.isAuthenticated = Session.isAuthenticated();
            }
            isAuthorized(roles) {
                return this.Session.isAuthorized(roles);
            }
            login(user) {
                this.UserService.login(user).then((res) => {
                    this.$state.go('main.profile', { username: res.username }, { reload: true, notify: true });
                }).catch((err) => {
                    this.alerts.push({ type: 'warning', message: 'Something went awry!!, Try again!' });
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
            goToState(state) {
                console.log(state);
                this.$state.go(state);
            }
        }
        Components.Navigation = Navigation;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Navigation,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
