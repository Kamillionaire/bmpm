var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        const name = 'login';
        const template = '/client/ngApp/components/login/login.html';
        class Login {
            constructor(UserService, $state, Session) {
                this.UserService = UserService;
                this.$state = $state;
                this.Session = Session;
                this.alerts = [];
            }
            login(user) {
                this.UserService.login(user).then((res) => {
                    this.$state.go('main.profile', { username: res.username }, { reload: true, notify: true });
                }).catch((err) => {
                    this.alerts.push({ type: 'warning', message: 'Something went awry!!, Try again!' });
                });
            }
            close(i) {
                this.alerts.splice(i, 1);
            }
            logout() {
                this.UserService.logout().then(() => {
                    this.$state.go('main.home', null, { reload: true, notify: true });
                }).catch(() => {
                    throw new Error('Unsuccessful logout');
                });
            }
        }
        Components.Login = Login;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Login,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
