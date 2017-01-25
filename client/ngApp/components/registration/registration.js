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
                    alert('You did it!, now go login!');
                    _this.$state.go('main.login', null, { reload: true, notify: true });
                }).catch(function (e) {
                    throw new Error(e);
                });
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
