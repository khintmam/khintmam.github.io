app.controller('detailFeedController',['feedService', '$scope', '$routeParams', function (feedService, $scope, $routeParams) {
    feedService.getFeedByID($routeParams.id).then(function (results) {
        if (results.data == -2) alert(-2)
        else $scope.feed = results.data;
    }, function (err) { alert('error'); });
}]);