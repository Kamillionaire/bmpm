var BMPM;
(function (BMPM) {
    var Components;
    (function (Components) {
        var name = 'registration';
        var template = '/ngApp/components/registration/registration.html';
        var Registration = (function () {
            function Registration(UserService, $state) {
                this.UserService = UserService;
                this.$state = $state;
                this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                    'WY').split(' ');
                this.personalities = ('INTJ(-A/-T) INTP(-A/-T) ENTJ(-A/-T) ENTP(-A/-T) ' +
                    'INFJ(-A/-T) INFP(-A/-T) ENFJ(-A/-T) ENFP(-A/-T) ' +
                    'ISTJ(-A/-T) ISFJ(-A/-T) ESTJ(-A/-T) ESFJ(-A/-T) ' +
                    'ISTP(-A/-T) ISFP(-A/-T) ESTP(-A/-T) ESFP(-A/-T)').split(' ');
            }
            return Registration;
        }());
        Components.Registration = Registration;
        angular.module('bmpm').component(name, {
            templateUrl: template,
            controller: BMPM.Components.Registration,
            controllerAs: 'vm'
        });
    })(Components = BMPM.Components || (BMPM.Components = {}));
})(BMPM || (BMPM = {}));
