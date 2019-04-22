var app = angular.module('bloggerApp', ['ngRoute']);

//*** Router Provider ***
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
      .when('/', {
	      templateUrl: 'pages/home.html',
		  controller: 'HomeController',
          controllerAs: 'vm'
		  })

      .when('/blog-list', {
	      templateUrl: 'pages/blog-list.html',
		  controller : 'ListController',
          controllerAs: 'vm'
		  })

      .when('/blog-add', {
	      templateUrl: 'pages/blog-add.html',
		  controller: 'AddController',
          controllerAs: 'vm'
		  })

      .when('/blog-edit/:id', {
	      templateUrl: 'pages/blog-edit.html',
		  controller: 'EditController',
          controllerAs: 'vm'
		  })

      .when('/blog-delete/:id', {
	      templateUrl: 'pages/blog-delete.html',
		  controller: 'DeleteController',
          controllerAs: 'vm'
		  })

      .when('/register', {
        templateUrl: '/auth/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      .otherwise({redirectTo: '/'});

    });

    //*** REST Web API functions ***
    function blogList($http) {
        return $http.get('/api/blog');
    }

    function blogReadOne($http, id) {
        return $http.get('/api/blog/' + id);
    }

    function blogUpdateOne($http, id, data, authentication) {
        return $http.put('/api/blog/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
    }

    function blogDeleteOne($http, id, authentication,) {
        return $http.delete('/api/blog/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
    }

    function blogCreate($http, data, authentication,) {
        return $http.post('/api/blog/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
    }


    function getTimeString(){
        var date = new Date();
        //var time = date.toJSON().slice(0,10).replace(/-/g,'/');
        var time = date.toLocaleDateString();
        time += ' ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return time;
    }


    //*** Controllers ***
    app.controller('HomeController', function HomeController() {
        var vm = this;
        vm.pageHeader = {
            title: "Blogger"
        };
        vm.message = "Welcome to Blogger a Mean Stack blogging site!";
    });

    //*** Controllers ***
    app.controller('ListController', function ListController($http) {
        var vm = this;
        vm.pageHeader = {
            title: 'Blog List'
        };

        blogList($http)
          // google js .then () call back function
          .then(function successCallback(response) {
            vm.blogs = response.data;
            vm.message = "blog data found!";
          },
          function errorCallback(response) {
            vm.message = "Could not get list of blogs";
          });
    });

    app.controller('AddController',[ '$http', '$location', 'authentication', function AddController($http, $location, authentication) {
        var vm = this;
        vm.blogs = {};
        vm.pageHeader = {
            title: 'Blog Add'
        };

        // Submit function attached to ViewModel for use in form
        vm.submit = function() {
            var data = vm.blogs;
            data.author = authentication.currentUser().name;
            data.email = authentication.currentUser().email;
            data.blogTitle = userForm.blogTitle.value;
            data.blogText = userForm.blogText.value;
            data.createdOn = getTimeString();

            blogCreate($http, data, authentication)
              .then(function successCallback(response) {
                vm.message = "Book data updated!";
                $location.path('blog-list');   // Refer to blog for info on StateProvder
              },
              function errorCallback(response) {
                vm.message = "Could not add blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
              });
        }

    }]);

    app.controller('EditController', [ '$http', '$routeParams', '$location', 'authentication', function EditController($http, $routeParams, $location, authentication) {
        var vm = this;
        vm.blogs = {};       // Start with a blank Blog
        vm.id = $routeParams.id;    // Get id from $routParams which must be injected and passed into controller
        vm.pageHeader = {
            title: 'Blog Edit'
        };

      // Get blog data so it may be displayed on edit page
      blogReadOne($http, vm.id)
        .then(function successCallback(response) {
          vm.blogs = response.data;
          vm.message = "Blog View";
        },
        function errorCallback(response) {
          vm.message = "Could not get blog given id of " + vm.id;
        });

        // Submit function attached to ViewModel for use in form
        vm.submit = function() {
          var data = vm.blogs;
          data.blogTitle = userForm.blogTitle.value;
          data.blogText = userForm.blogText.value;
          data.createdOn = getTimeString();

            blogUpdateOne($http, vm.id, data, authentication)
              .then(function successCallback(response) {
                vm.message = "Book data updated!";
                $location.path('blog-list');   // Refer to blog for info on StateProvder
              },
              function errorCallback(response) {
                vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
              });
        }
    }]);

    //*** Controllers ***
    app.controller('DeleteController', [ '$http', '$routeParams', '$location', 'authentication', function DeleteController($http, $routeParams, $location, authentication) {
        var vm = this;
        vm.blogs = {};       // Start with a blank Blog
        vm.id = $routeParams.id;    // Get id from $routParams which must be injected and passed into controller

        vm.pageHeader = {
            title: 'Blog Delete'
        };

        // Get blog data so it may be displayed on delete page
        blogReadOne($http, vm.id)
          .then(function successCallback(response) {
            vm.blogs = response.data;
            vm.message = "Blog data found!";
          },
          function errorCallback(response) {
            vm.message = "Could not get blog given id of " + vm.id;
          });

          vm.submit = function() {

              blogDeleteOne($http, vm.id, authentication)
                .then(function successCallback(response) {
                  vm.message = "Book data updated!";
                  $location.path('blog-list');   // Refer to blog for info on StateProvder
                },
                function errorCallback(response) {
                  vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
                });
          }

    }]);
