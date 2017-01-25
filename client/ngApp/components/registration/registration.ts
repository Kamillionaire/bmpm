namespace BMPM.Components {
    const name = 'registration';
    const template = '/client/ngApp/components/registration/registration.html';
    export class Registration {
        public user = {dob:new Date()}
        public pTypes;
        public states;
        constructor(
            private UserService: BMPM.Services.UserService,
            private $state: ng.ui.IStateService,
            STATES, $http:ng.IHttpService,
        ) {
            $http.get('/api/pTypes').then((res)=>{
              this.pTypes = res.data;
            }).catch ((e)=>{
              throw new Error (e)
            })
          this.states = STATES.all;
         }

        register() {
            this.UserService.register(this.user).then((result) => {
                alert('You did it!, now go login!')
                this.$state.go('main.login', null, { reload: true, notify: true });
            }).catch((e) => {
                throw new Error(e);
            })
        }
    }

    angular.module('bmpm').component(name, {
        templateUrl: template,
        controller: BMPM.Components.Registration,
        controllerAs: 'vm'
    })
}
