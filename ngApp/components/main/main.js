var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'mainApp';
        var template = '/ngApp/components/main/main.html';
        var Main = (function () {
            function Main(UserService, $state) {
                this.UserService = UserService;
                this.$state = $state;
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
