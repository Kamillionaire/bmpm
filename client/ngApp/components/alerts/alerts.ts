namespace BMPM.Components{
  const name='alerts';
  const template='/client/ngApp/components/alerts/alerts.html';
  export class Alerts {
    public messages = [];
    constructor(

    ) {


    }
    close (i){
      this.messages.splice(i,1);
    }
  }

  angular.module('bmpm').component(name, {
      templateUrl: template,
      controller: BMPM.Components.Alerts,
      controllerAs: 'vm',
      bindings: {
        messages:'<'
      }

  })
}
