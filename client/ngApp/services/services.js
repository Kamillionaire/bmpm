var BMPM;
(function (BMPM) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LogoutResource = $resource('/api/logout/local');
                this.LoginResource = $resource('/api/login/local');
                this.RegisterResource = $resource('/api/Register');
                this.UserResource = $resource('/api/users/:username');
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
            UserService.prototype.getProfile = function (username) {
                return this.ProfileResource.get({ username: username }).$promise;
            };
            UserService.prototype.deleteUser = function (id) {
                return this.UserResource.delete(id).$promise;
            };
            UserService.prototype.listUsers = function () {
                return this.UserResource.query().$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        var ProfileService = (function () {
            function ProfileService($resource) {
                this.$resource = $resource;
                this.ProfileResource = $resource('/api/profile/:username', { username: '@username' });
            }
            ProfileService.prototype.getProfile = function (username) {
                return this.ProfileResource.get({ username: username }).$promise;
            };
            return ProfileService;
        }());
        Services.ProfileService = ProfileService;
        ;
        var Session = (function () {
            function Session($sessionStorage) {
                this.$sessionStorage = $sessionStorage;
                this.user = this.getUser();
            }
            Session.prototype.create = function (user) {
                this.$sessionStorage['user'] = user;
            };
            Session.prototype.isAuthenticated = function () {
                var user = this.getUser();
                return !!user['username'];
            };
            Session.prototype.isAuthorized = function (roles) {
                var user = this.getUser();
                if (!user['roles']) {
                    return false;
                }
                if (!angular.isArray(roles)) {
                    roles = [roles];
                }
                return roles.some(function (v, k) {
                    for (var i in user['roles']) {
                        if (user['roles'][i] === v) {
                            return true;
                        }
                    }
                });
            };
            Session.prototype.getUser = function () {
                return this.$sessionStorage['user'] || {};
            };
            Session.prototype.destroy = function () {
                this.$sessionStorage.$reset();
                this.$sessionStorage['user'] = {};
            };
            return Session;
        }());
        Services.Session = Session;
        ;
        angular.module('bmpm').service('Session', Session);
        angular.module('bmpm').service('UserService', UserService);
        angular.module('bmpm').service('ProfileService', ProfileService);
    })(Services = BMPM.Services || (BMPM.Services = {}));
})(BMPM || (BMPM = {}));
;
