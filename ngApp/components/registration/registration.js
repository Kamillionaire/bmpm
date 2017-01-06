var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'registration';
        var template = '/ngApp/components/registration/registration.html';
        var Registration = (function () {
            function Registration(UserService, $state) {
                this.UserService = UserService;
                this.$state = $state;
                this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                    'WY').split(' ');
            }
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
