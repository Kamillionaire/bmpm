var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'navigation';
        var template = '/ngApp/components/navigation/navigation.html';
        var Navigation = (function () {
            function Navigation() {
            }
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
