namespace BMPM.Components{
  const name='home';
  const template='/client/ngApp/components/home/home.html';
  export class Home {

  }
  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Home,
    controllerAs: 'vm'

  })
}
