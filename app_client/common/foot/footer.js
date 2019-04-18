var app = angular.module('bloggerApp');

//*** Directives ***
app.directive('footer', function() {
    return {
      restrict: 'EA',
      templateUrl: '/common/foot/footer.html',
      controller: 'FooterController',
      controllerAs: 'vm'
    };
});

//*** Controller ***
app.controller('FooterController', ['$location', 'authentication', function FooterController($location, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
}]);
