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
            Login.prototype.login = function (user) {
                var _this = this;
                this.UserService.login(user).then(function (res) {
                    _this.$state.go('main.home', null, { reload: true, notify: true });
                }).catch(function (err) {
                    alert('Bunk login, please try again.');
                });
            };
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
