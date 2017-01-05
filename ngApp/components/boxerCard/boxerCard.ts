namespace BMPM.Components {
  //component config
  //boxerCard translates to <boxer-card boxer="vm.boxer"></boxer-card>
  const name = 'boxerCard'
  const template = '/ngApp/components/boxerCard/boxerCard.html';

  export class BoxerCard {
    public boxer;
    constructor(
      private BoxerService: BMPM.Services.BoxerService
    ) {
    }

    submit() {
      this.BoxerService.update(this.boxer)
        .then((data) => {
          //null
        }).catch((e) => {
          throw new Error(e);
        })
    }
  }

  angular.module('bmpm').component(name, {
    templateUrl: template,
    controller: BMPM.Components.BoxerCard,
    controllerAs: 'vm',
    bindings: {
      boxer: '<'
    }
  });
}
