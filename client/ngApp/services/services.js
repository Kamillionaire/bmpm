var BMPM;
(function (BMPM) {
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
        angular.module('bmpm').service('BoxerService', BoxerService);
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LogoutResource = $resource('/api/logout/local');
                this.LoginResource = $resource('/api/login/local');
                this.RegisterResource = $resource('/api/Register');
                this.UserResource = $resource('/api/users/:id');
            }
            UserService.prototype.login = function (user) {
                return this.LoginResource.save(user).$promise;
            };
            UserService.prototype.logout = function () {
                return this.LogoutResource.get().$promise;
            };
            UserService.prototype.register = function (user) {
                return this.RegisterResource.save(user).$promise;
            };
            UserService.prototype.getUser = function (id) {
                return this.UserResource.get(id).$promise;
            };
            UserService.prototype.getCurrentUser = function () {
                return this.$resource('/api/currentuser').get().$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('bmpm').service('UserService', UserService);
    })(Services = BMPM.Services || (BMPM.Services = {}));
})(BMPM || (BMPM = {}));
