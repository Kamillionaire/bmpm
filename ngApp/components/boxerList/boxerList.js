var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'boxerList';
        var template = '/ngApp/components/boxerList/boxerList.html';
        var BoxerList = (function () {
            function BoxerList(BoxerService, $state) {
                var _this = this;
                this.BoxerService = BoxerService;
                this.$state = $state;
                $state.$current.locals.globals['currentUser'].$promise
                    .then(function (user) {
                    _this.currentUser = user;
                }).catch(function (user) {
                    _this.currentUser = user;
                });
                this.BoxerService.getBoxers()
                    .then(function (data) {
                    _this.boxers = data;
                }).catch(function (e) {
                    _this.boxers = [];
                    throw new Error(e);
                });
            }
            return BoxerList;
        }());
        Components.BoxerList = BoxerList;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.BoxerList,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
