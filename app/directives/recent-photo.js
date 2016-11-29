
app.directive('recentPhoto', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/recent-photo-template.html',
        scope: {
            user: '='
        },
        controller: 'RecentPhotoTemplateController'
    };
}).controller('RecentPhotoTemplateController', ['$scope', 'imageService', 'authService', 'ngDialog',
    function ($scope, imageService, authService, ngDialog) {
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
                    console.log(results.data);
                   
                }
            }, function (err) {
                alert('error');
            });
        }
    }, 100);
    $scope.Show = function (index) {
        //Check Image Has Feed or Not
        var image = $scope.listRecent[index];
        if (image.feed == null) {
            //Show dialog image
            $scope.img = image;
            ngDialog.open({
                template: '/app/templates/dialog-view-image.html',
                scope: $scope
            });
        }
        else { //Show dialog feed
            $scope.feed = image.feed;
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
            });

        }
    };
   
}]);