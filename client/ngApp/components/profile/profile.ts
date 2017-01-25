namespace BMPM.Components{
    const name ='profile';
    const template ='/client/ngApp/components/profile/profile.html';
    export class Profile {
        public currentUser;
        public profileID;
        public profile;
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
