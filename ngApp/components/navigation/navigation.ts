namespace BMPM.Components{
  const name='navigation';
  const template='/ngApp/components/navigation/navigation.html';
  export class Navigation {

    // constructor(


  }
  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Navigation,
    controllerAs: 'vm'

  })
}
