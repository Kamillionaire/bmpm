var BMPM;
(function (BMPM) {
    var Services;
    (function (Services) {
        class UserService {
            constructor($resource) {
                this.$resource = $resource;
                this.LogoutResource = $resource('/api/logout/local');
                this.LoginResource = $resource('/api/login/local');
                this.RegisterResource = $resource('/api/Register');
                this.UserResource = $resource('/api/users/:username', { username: '@username' });
            }
            login(user) {
                return this.LoginResource.save(user).$promise;
            }
            logout() {
                return this.LogoutResource.get().$promise;
            }
            register(user) {
                return this.RegisterResource.save(user).$promise;
            }
            getUser(id) {
                return this.UserResource.get(id).$promise;
            }
            getCurrentUser() {
                return this.$resource('/api/currentuser').get().$promise;
            }
            deleteUser(username) {
                return this.UserResource.delete({ username: username }).$promise;
            }
            listUsers() {
                return this.UserResource.query().$promise;
            }
        }
        Services.UserService = UserService;
        class ProfileService {
            constructor($resource) {
                this.$resource = $resource;
                this.ProfileResource = $resource('/api/profile/:username', { username: '@username' });
            }
            getProfile(username) {
                return this.ProfileResource.get({ username: username }).$promise;
            }
        }
        Services.ProfileService = ProfileService;
        ;
        class Session {
            constructor($sessionStorage) {
                this.$sessionStorage = $sessionStorage;
                this.user = this.getUser();
            }
            create(user) {
                this.$sessionStorage['user'] = user;
            }
            isAuthenticated() {
                let user = this.getUser();
                return !!user['username'];
            }
            isAuthorized(roles) {
                let user = this.getUser();
                if (!user['roles']) {
                    return false;
                }
                if (!angular.isArray(roles)) {
                    roles = [roles];
                }
                return roles.some((v, k) => {
                    for (let i in user['roles']) {
                        if (user['roles'][i] === v) {
                            return true;
                        }
                    }
                });
            }
            getUser() {
                return this.$sessionStorage['user'] || {};
            }
            destroy() {
                this.$sessionStorage.$reset();
                this.$sessionStorage['user'] = {};
            }
        }
        Services.Session = Session;
        ;
        angular.module('bmpm').service('Session', Session);
        angular.module('bmpm').service('UserService', UserService);
        angular.module('bmpm').service('ProfileService', ProfileService);
    })(Services = BMPM.Services || (BMPM.Services = {}));
})(BMPM || (BMPM = {}));
;
