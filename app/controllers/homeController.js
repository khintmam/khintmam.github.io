'use strict';
app.controller('homeController', ['$scope', 'feedService', 'authService', function ($scope, feedService, authService) {
    
  
    $scope.isloadfeed = false;
    $scope.listFeed = [];
    $scope.authentication = authService.authentication;
    
    feedService.getFeed().then(function (rs) {
        $scope.listFeed = rs.data;
    }, function () {

    });
    $scope.AddNewFeed = function (feed) {
        $scope.listFeed.shift(feed);
    };
    $scope.GetMoreFeed = function () {
        $scope.isloadfeed = true;
        var lastid = $scope.listFeed[$scope.listFeed.length - 1].id;
        var type = 1;
        var username = '';

        feedService.getMoreFeed(lastid, type, username).then(function (results) {
            if (results.data == -2) alert(-2);
            else if (results.data == -1) alert(-1)
            else
            {
                $scope.listFeed.push.apply($scope.listFeed, results.data);
                
            }
            $scope.isloadfeed = false;
        });
    };

    
   
}]);