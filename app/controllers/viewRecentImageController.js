'use strict';
app.controller('viewRecentImageController', ['$scope', '$routeParams', 'imageService', 'ngDialog'
    , function ($scope, $routeParams, imageService, ngDialog) {
        imageService.getRecentImage($routeParams.username, 2).then(function (results) {
            if (results == -2) alert(-2);
            else
            {
                $scope.images = results.data;
            }
        }, function (err) {
            alert('error');
        });
        $scope.ShowFeed = function(feed)
        {
            $scope.feed = feed;
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
            });           
        }
}]);