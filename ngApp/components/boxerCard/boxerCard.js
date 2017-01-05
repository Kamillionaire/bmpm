var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'boxerCard';
        var template = '/ngApp/components/boxerCard/boxerCard.html';
        var BoxerCard = (function () {
            function BoxerCard(BoxerService) {
                this.BoxerService = BoxerService;
            }
            BoxerCard.prototype.submit = function () {
                this.BoxerService.update(this.boxer)
                    .then(function (data) {
                }).catch(function (e) {
                    throw new Error(e);
                });
            };
            return BoxerCard;
        }());
        Components.BoxerCard = BoxerCard;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.BoxerCard,
            controllerAs: 'vm',
            bindings: {
                boxer: '<'
            }
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
