var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        const name = 'registration';
        const template = '/client/ngApp/components/registration/registration.html';
        class Registration {
            constructor(UserService, $state, STATES, $http) {
                this.UserService = UserService;
                this.$state = $state;
                this.user = { dob: new Date() };
                this.alerts = [];
                $http.get('/api/pTypes').then((res) => {
                    this.pTypes = res.data;
                }).catch((e) => {
                    throw new Error(e);
                });
                this.states = STATES.all;
            }
            register() {
                this.UserService.register(this.user).then((result) => {
                    this.$state.go('main.login', null, { reload: true, notify: true });
                }).catch((err) => {
                    console.log(err);
                    this.alerts.push({ type: 'warning', message: 'Please fill out all fields.' });
                });
            }
        }
        Components.Registration = Registration;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Registration,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
