var chThreeApp;
(function (chThreeApp) {
    var Services;
    (function (Services) {
        var BoxerService = (function () {
            function BoxerService($resource) {
                this.BoxerResource = $resource('/api/boxers/:id', { id: '@id' }, { update: { method: 'put' } });
            }
            BoxerService.prototype.getBoxers = function () {
                return this.BoxerResource.query().$promise;
            };
            BoxerService.prototype.update = function (boxer) {
                return this.BoxerResource.update({ id: boxer._id }, boxer).$promise;
            };
            return BoxerService;
        }());
        Services.BoxerService = BoxerService;
        angular.module('ch-three-app').service('BoxerService', BoxerService);
    })(Services = chThreeApp.Services || (chThreeApp.Services = {}));
})(chThreeApp || (chThreeApp = {}));
