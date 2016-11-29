'use strict';
app.controller('viewImageFeedController', ['$scope', '$routeParams', 'feedService', 'ngDialog'
    , function ($scope, $routeParams, feedService, ngDialog) {

        $scope.ShowFeed = function () {
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
            });

        }

        feedService.getImageByFeed($routeParams.id).then(function (results) {
            if (results == -2) alert(-2);
            else
            {
                $scope.images = results.data.images;
                $scope.feed = results.data.feed;
               
            }
        }, function (err) {
            alert('error');
        });

}]);