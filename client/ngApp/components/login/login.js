var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'login';
        var template = '/client/ngApp/components/login/login.html';
        var Login = (function () {
            function Login(UserService, $state, Session) {
                this.UserService = UserService;
                this.$state = $state;
                this.Session = Session;
                this.alerts = [];
            }
            Login.prototype.login = function (user) {
                var _this = this;
                this.UserService.login(user).then(function (res) {
                    _this.$state.go('main.profile', { username: res.username }, { reload: true, notify: true });
                }).catch(function (err) {
                    _this.alerts.push({ type: 'warning', message: 'Something went awry!!, Try again!' });
                });
            };
            Login.prototype.close = function (i) {
                this.alerts.splice(i, 1);
            };
            Login.prototype.logout = function () {
                var _this = this;
                this.UserService.logout().then(function () {
                    _this.$state.go('main.home', null, { reload: true, notify: true });
                }).catch(function () {
                    throw new Error('Unsuccessful logout');
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
