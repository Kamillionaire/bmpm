namespace BMPM.Components {
    //component config
    //boxerList translates to <boxer-list></boxer-list>
    const name = 'boxerList'
    const template = '/ngApp/components/boxerList/boxerList.html';

    export class BoxerList {
      public boxers;
      public currentUser;
      constructor(
        private BoxerService: BMPM.Services.BoxerService,
        private $state: ng.ui.IStateService
      ) {

        $state.$current.locals.globals['currentUser'].$promise
        .then((user) => {
          this.currentUser = user;
        }).catch((user) => {
          this.currentUser = user;
        });
        this.BoxerService.getBoxers()
          .then((data) => {
            this.boxers = data;
          }).catch((e) => {
            this.boxers = [];
            throw new Error(e);
          })
      }
    }

    angular.module('bmpm').component(name, {
      templateUrl: template,
      controller: BMPM.Components.BoxerList,
      controllerAs: 'vm'
    });
  }
