namespace BMPM.Services {
  export class BoxerService{
    public BoxerResource;

    getBoxers() {
      return this.BoxerResource.query().$promise;
    }

    //TODO should be typed
    update(boxer) {
      return this.BoxerResource.update({id: boxer._id}, boxer).$promise;
    }

    constructor(
      $resource: ng.resource.IResourceService
    ) {
      this.BoxerResource = $resource('/api/boxers/:id', {id: '@id'}, { update: { method: 'put' }});
    }
  }


  angular.module('bmpm').service('BoxerService', BoxerService);


  export class UserService {
    private LoginResource;
    private LogoutResource;
    private RegisterResource;
    public UserResource;
    private isLoggedIn;

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

    constructor(private $resource: ng.resource.IResourceService) {

      this.LogoutResource = $resource('/api/logout/local');
      this.LoginResource = $resource('/api/login/local');
      this.RegisterResource = $resource('/api/Register');
      this.UserResource = $resource('/api/users/:id');
    }
  }

  angular.module('bmpm').service('UserService', UserService);

}
