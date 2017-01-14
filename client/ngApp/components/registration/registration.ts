namespace BMPM.Components{
  const name='registration';
  const template='/client/ngApp/components/registration/registration.html';
  export class Registration {
  states= ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ');

  constructor(
        private UserService: BMPM.Services.UserService,
        private $state: ng.ui.IStateService
      ){}
  personalities= ('INTJ(-A/-T) INTP(-A/-T) ENTJ(-A/-T) ENTP(-A/-T) ' +
                  'INFJ(-A/-T) INFP(-A/-T) ENFJ(-A/-T) ENFP(-A/-T) ' +
                  'ISTJ(-A/-T) ISFJ(-A/-T) ESTJ(-A/-T) ESFJ(-A/-T) ' +
                  'ISTP(-A/-T) ISFP(-A/-T) ESTP(-A/-T) ESFP(-A/-T)').split(' ');

    //TODO states and personality types can be constants.
    // logout() {
    //   this.UserService.logout().then(() => {
    //     this.$state.go('registration.home', null, {reload: true, notify:true});
    //   }).catch(() => {
    //     throw new Error('Unsuccessful logout');
    //   });
    // }

      register(user){
        this.UserService.register(user).then((result)=>{
          alert('Successful login!')
        }).catch((e)=>{
          throw new Error(e);
        })
      }
  }

  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Registration,
    controllerAs: 'vm'
  })
}
