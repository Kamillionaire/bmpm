namespace BMPM.Services {


    export class UserService {
        private LoginResource;
        private LogoutResource;
        private RegisterResource;
        public UserResource;
        private isLoggedIn;
        public ProfileResource

        constructor(private $resource: ng.resource.IResourceService) {

            this.LogoutResource = $resource('/api/logout/local');
            this.LoginResource = $resource('/api/login/local');
            this.RegisterResource = $resource('/api/Register');
            this.UserResource = $resource('/api/users/:username',{username:'@username'} );
        }
        public login(user) {
            return this.LoginResource.save(user).$promise;
        }

        public logout() {
            return this.LogoutResource.get().$promise;
        }

        public register(user) {
            return this.RegisterResource.save(user).$promise;
        }

        public getUser(id) {
            return this.UserResource.get(id).$promise;
        }

        public getCurrentUser() {
            return this.$resource('/api/currentuser').get().$promise;

        }

        public deleteUser(username){
          return this.UserResource.delete({username:username}).$promise;
        }
        public listUsers(){
          return this.UserResource.query().$promise;
        }
    }
    export class ProfileService {
        public ProfileResource
      constructor(private $resource: ng.resource.IResourceService){
            this.ProfileResource = $resource('/api/profile/:username',{username:'@username'});

      }
      public getProfile(username) {
          return this.ProfileResource.get({username:username}).$promise;
      }
    };

    export class Session {
        public user;
        constructor(
            private $sessionStorage: ng.storage.IStorageService
        ) {
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
    };


    angular.module('bmpm').service('Session', Session);
    angular.module('bmpm').service('UserService', UserService);
    angular.module('bmpm').service('ProfileService', ProfileService);

};
