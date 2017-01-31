namespace BMPM.Components{
    const name ='usersIndex';
    const template ='/client/ngApp/components/usersIndex/usersIndex.html';
    export class UsersIndex {
        public currentUser;
        public profileID;
        public profile;
        public users;
        public tableParams;
      constructor(
        private UserService: BMPM.Services.UserService,
        private $state: ng.ui.IStateService,
        Session,
        $stateParams,
        _,
        private NgTableParams
      ) {
        this.currentUser = Session.getUser()
        this.tableParams = new NgTableParams({},{getData:(params)=>{
          return this.UserService.listUsers().then ((users)=>{
            return users;
          }).catch ((err)=>{
            throw new Error (err);
          })


        }} );
        // this.profileID = $stateParams['username'] === 'me' && !_.isUndefined(this.currentUser.username)
        //  ? this.currentUser.username : null;

        }
        delete() {
            // this.UserService.deleteUser(this.Session.user).then(() => {
            //     this.$state.go('main.usersIndex', null, { reload: true, notify: true });
            // }).catch(() => {
            //     throw new Error('Unsuccessful delete');
            // });
        }
    };

  angular.module('bmpm').component(name,{
    templateUrl: template,
    controller: BMPM.Components.UsersIndex,
    controllerAs: 'vm',
    bindings:{
      users:'<'
    }


  });
};
