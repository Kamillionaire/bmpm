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
            }
            Login.prototype.registration = function (user) {
                var _this = this;
                this.UserService.login(user).then(function (res) {
                    _this.Session.create(Components.Registration);
                    _this.$state.go('main.home', null, { reload: true, notify: true });
                }).catch(function (err) {
                    alert('Bunk login, please try again.');
                });
            };
            Login.prototype.login = function (user) {
                var _this = this;
                console.log(user);
                this.UserService.login(user).then(function (res) {
                    _this.$state.go('main.home', null, { reload: true, notify: true });
                }).catch(function (err) {
                    alert('Bunk login, please try again.');
                });
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
