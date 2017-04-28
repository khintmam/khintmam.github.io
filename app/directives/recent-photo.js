
app.directive('recentPhoto', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/recent-photo-template.html',
        scope: {
            user: '='
        },
        controller: 'RecentPhotoTemplateController'
    };
}).controller('RecentPhotoTemplateController', ['$scope', 'imageService', 'authService', 'ngDialog', 'feedService',
    function ($scope, imageService, authService, ngDialog, feedService) {
    $scope.auth = authService.authentication;
    var interval = setInterval(function () {
        if ($scope.user.username == undefined) return;
        else
        {
            clearInterval(interval);

            imageService.getRecentImage($scope.user.username, 1).then(function (results) {
                if (results.data == -2) alert(-2);
                else {
                    $scope.listRecent = results.data;
                   
                }
            }, function (err) {
                alert('error');
            });
        }
    }, 100);
    $scope.ShowFeed = function (img) {
        feedService.getFeedByID($scope.list[img].feed).then(function (results) {
            $scope.feed = results.data;
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
            });
        }, function (err) {
            alert(err);
            console.log(err);
        });

    };
    $scope.ShowImage = function(index){
            $scope.img = index;
            $scope.list = $scope.listRecent;
            ngDialog.open({
                template: '/app/templates/dialog-view-image.html',
                controller: 'ViewImageController',
                 scope: $scope
            });
    }
   
}]);