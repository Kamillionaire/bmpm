namespace BMPM.Components{
    const name ='profile';
    const template ='/client/ngApp/components/profile/profile.html';
    export class Profile {
        public currentUser;
        public profileID;
        public profile;
        public alerts;
      constructor(
        private UserService: BMPM.Services.UserService,
        private $state: ng.ui.IStateService,
        Session,
        $stateParams,
        _

      ) {
        this.currentUser = Session.getUser()
        // this.profileID = $stateParams['username'] === 'me' && !_.isUndefined(this.currentUser.username)
        //  ? this.currentUser.username : null;

        }
        public login(user) {

          this.UserService.login(user).then((res) => {
             this.$state.go('main.profile', {username:res.username}, {reload: true, notify:true});
          }).catch((err) => {
            this.alerts.push({type:'warning',message:'Something went awry!!, Try again!'})
          });
        }
    };

  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.Profile,
    controllerAs: 'vm',
    bindings:{
      profile:'<'
    }

  });
};
