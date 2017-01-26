var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'registration';
        var template = '/client/ngApp/components/registration/registration.html';
        var Registration = (function () {
            function Registration(UserService, $state, STATES, $http) {
                var _this = this;
                this.UserService = UserService;
                this.$state = $state;
                this.user = { dob: new Date() };
                this.alerts = [];
                $http.get('/api/pTypes').then(function (res) {
                    _this.pTypes = res.data;
                }).catch(function (e) {
                    throw new Error(e);
                });
                this.states = STATES.all;
            }
            Registration.prototype.register = function () {
                var _this = this;
                this.UserService.register(this.user).then(function (result) {
                    _this.$state.go('main.login', null, { reload: true, notify: true });
                }).catch(function (err) {
                    console.log(err);
                    _this.alerts.push({ type: 'warning', message: 'Please fill out all fields.' });
                });
            };
            Registration.prototype.close = function (i) {
                this.alerts.splice(i, 1);
            };
            return Registration;
        }());
        Components.Registration = Registration;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Registration,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
