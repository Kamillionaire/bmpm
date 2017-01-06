var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'mainApp';
        var template = '/ngApp/components/main/main.html';
        var Main = (function () {
            function Main(UserService, $state) {
                var _this = this;
                this.UserService = UserService;
                this.$state = $state;
                $state.$current.locals.globals['currentUser'].$promise
                    .then(function (user) {
                    _this.currentUser = user;
                }).catch(function (user) {
                    _this.currentUser = user;
                });
            }
            return Main;
        }());
        Components.Main = Main;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Main,
            controllerAs: 'vm',
            bindings: {
                currentUser: '<'
            }
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
