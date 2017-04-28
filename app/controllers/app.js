var app;
var isHubStart = false;
(function () {
   

    app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngDialog', 'ngFileUpload', 'ngTouch']);

    app.config(function ($routeProvider) {
        $routeProvider.when("/home/", {
            controller: "homeController",
            templateUrl: "/app/views/home.html"
        });
        $routeProvider.when("/feed/:id/", {
            controller: "detailFeedController",
            templateUrl: "app/views/detail-feed.html"
        });
        $routeProvider.when("/viewrecentimage/:username/", {
            controller: "viewRecentImageController",
            templateUrl: "app/views/view-recent-image.html"
        });
         $routeProvider.when("/album/", {
            controller: "MyAlbumController",
            templateUrl: "app/views/my-album.html"
         });
         $routeProvider.when("/album/:username/", {
             controller: "ViewAlbumController",
             templateUrl: "app/views/view-album.html"
         });

        $routeProvider.when("/messenger/", {
            controller: "messengerController",
            templateUrl: "app/views/messenger.html"
        });
        $routeProvider.when("/messenger/:username/", {
            controller: "MessengerPersonController",
            templateUrl: "app/views/messenger-person.html"
        });
        $routeProvider.when("/user/:username/", {
            controller: "TimeLineController",
            templateUrl: "app/views/time-line.html",
            resolve: {
                "check": function ($route, $location, authService) {   //function to be resolved, accessFac and $location Injected
                    
                    if ($route.current.params.username == authService.authentication.userName) {    //check if the user has permission -- This happens before the page loads
                        $location.path('/user');
                    } else {
                       
                    }
                }
            }
        });
        $routeProvider.when("/user/", {
            controller: "PersonalController",
            templateUrl: "app/views/personal.html"
        });
        $routeProvider.when("/viewimagebyfeed/:id/", {
            controller: "viewImageFeedController",
            templateUrl: "app/views/view-image-feed.html"
        });
        $routeProvider.when("/findfriend/:keyword/", {
            controller: "FindFriendController",
            templateUrl: "app/views/find-friend-template.html"
        });

        $routeProvider.when("/login/", {
            controller: "loginController",
            templateUrl: "/app/views/login.html"
        });


        $routeProvider.when("/signup/", {
            controller: "signupController",
            templateUrl: "/app/views/signup.html"
        });

        $routeProvider.when("/orders/", {
            controller: "ordersController",
            templateUrl: "/app/views/orders.html"
        });

        $routeProvider.when("/refresh/", {
            controller: "refreshController",
            templateUrl: "/app/views/refresh.html"
        });

        $routeProvider.when("/tokens/", {
            controller: "tokensManagerController",
            templateUrl: "/app/views/tokens.html"
        });

        $routeProvider.when("/associate/", {
            controller: "associateController",
            templateUrl: "/app/views/associate.html"
        });
        $routeProvider.when("/uploadfeed/", {
            controller: "uploadFeedController",
            templateUrl: "/app/views/upload-feed.html"
        });


        $routeProvider.otherwise({ redirectTo: "/home/" });

    });


    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);
   
})();






