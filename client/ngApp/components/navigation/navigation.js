var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'navigation';
        var template = '/client/ngApp/components/navigation/navigation.html';
        var Navigation = (function () {
            function Navigation($state, UserService, Session, $stateParams) {
                this.$state = $state;
                this.UserService = UserService;
                this.Session = Session;
                this.isAuthenticated = Session.isAuthenticated();
            }
            Navigation.prototype.logout = function () {
                var _this = this;
                this.UserService.logout().then(function () {
                    _this.Session.destroy();
                    _this.$state.go('main.home', null, { reload: true, notify: true });
                }).catch(function () {
                    throw new Error('Unsuccessful logout');
                });
            };
            return Navigation;
        }());
        Components.Navigation = Navigation;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Navigation,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
