app.controller("ViewImageController", ['$scope', 'ngDialog', 'feedService', function ($scope, ngDialog, feedService) {
    $scope.Next = function(){
        if ($scope.img < $scope.list.length - 1)
            $scope.img = $scope.img + 1;
    };
    $scope.Back = function(){
        if ($scope.img <= 0) return;
        $scope.img = $scope.img - 1;            

    };
    $scope.ShowFeed = function(img)
    {
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

}]);