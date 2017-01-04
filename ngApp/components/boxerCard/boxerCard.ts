namespace chThreeApp.Components {
  //component config
  //boxerCard translates to <boxer-card boxer="vm.boxer"></boxer-card>
  const name = 'boxerCard'
  const template = '/ngApp/components/boxerCard/boxerCard.html';

  export class BoxerCard {
    public boxer;
    constructor(
      private BoxerService: chThreeApp.Services.BoxerService
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

  angular.module('ch-three-app').component(name, {
    templateUrl: template,
    controller: chThreeApp.Components.BoxerCard,
    controllerAs: 'vm',
    bindings: {
      boxer: '<'
    }
  });
}
