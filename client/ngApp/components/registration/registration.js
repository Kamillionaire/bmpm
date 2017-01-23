var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'registration';
        var template = '/client/ngApp/components/registration/registration.html';
        var Registration = (function () {
            function Registration(UserService, $state, STATES, PTYPES) {
                this.UserService = UserService;
                this.$state = $state;
                this.pTypes = PTYPES.all;
                console.log(PTYPES);
                this.states = STATES.all;
            }
            Registration.prototype.register = function () {
                this.UserService.register(this.user).then(function (result) {
                    alert('Successful login!');
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
