app.controller("PersonalController", ['$scope', '$routeParams', 'userService', 'authService', 'ngDialog', 'feedService',
    function ($scope, $routeParams, userService, authService, ngDialog, feedService) {
        $scope.auth = authService.authentication;
        $scope.user = userService.getFullInfoUser($scope.auth.userName).then(function (results) {
            if (results.data == -2) alert(-2);
            else
            {
                $scope.user = results.data;
                console.log(results.data);
            }

        }, function (err) {
            alert('error');
        });


        //BgUser

        $scope.ShowEdit = function () {
            
        };
        $scope.ShowPostFeed = function () {
            ngDialog.open({
                template: '/app/templates/upload-feed.html',
                controller: 'AddFeedController'
            });
        };


        //list feed
        var interval = setInterval(function () {
            if ($scope.user.username == undefined) return;
            else {
                clearInterval(interval);

                feedService.getFeedByUsername($scope.user.username)
                  .then(function (results) {

                      if (results.data == -2) alert(-2);
                      else {
                          $scope.listFeed = results.data;
                          console.log($scope.listFeed);
                      }
                  },
                  function (error) {
                      alert('error');
                  });
            }
        }, 100);
            
        $scope.isloadfeed = false;
        $scope.GetMoreFeed = function () {
            $scope.isloadfeed = true;
            var lastid = $scope.listFeed[$scope.listFeed.length - 1].id;
            var type = 2;
            var username = $scope.auth.userName;

            feedService.getMoreFeed(lastid, type, username).then(function (results) {
                if (results.data == -2) alert(-2);
                else if (results.data == -1) alert(-1)
                else {
                    $scope.listFeed.push.apply($scope.listFeed, results.data);
                }
                $scope.isloadfeed = false;
            });
        };
        $scope.ShowBGImage = function () {
            //Check Image Has Feed or Not
            $scope.feed = $scope.user.bgUser.feed;
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
            });
        };
        $scope.ChangeBG = function () {
            $scope.user = $scope.user;
            ngDialog.open({
                template: 'app/templates/change-background-template.html',
                scope: $scope,
                controller: 'ChangeBackgroundController'
            });
        };

}]);