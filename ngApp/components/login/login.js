var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'login';
        var template = '/ngApp/components/login/login.html';
        var Login = (function () {
            function Login(UserService, $state) {
                this.UserService = UserService;
                this.$state = $state;
            }
            return Login;
        }());
        Components.Login = Login;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Login,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
