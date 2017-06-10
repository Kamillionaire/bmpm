var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        const name = 'mainApp';
        const template = '/client/ngApp/components/main/main.html';
        class Main {
            constructor(UserService, $state) {
                this.UserService = UserService;
                this.$state = $state;
            }
        }
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
