namespace chThreeApp.Services {
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

  angular.module('ch-three-app').service('BoxerService', BoxerService);
}
