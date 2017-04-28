/// <reference path="../../templates/change-avatar-template.html" />

app.directive('basicInfo', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/user-info/basic-info.html',
        scope: {
            user: '='
        },
        controller: 'BasicInfoController'
    };
}).controller('BasicInfoController', ['$scope', 'authService', 'ngDialog', 'feedService',
    function ($scope, authService, ngDialog, feedService) {
        $scope.auth = authService.authentication;
        $scope.IsCurrUser = function () {
            return $scope.auth.userName == $scope.user.username;
        };
        $scope.ChangeAvatar = function () {

            $scope.user = $scope.user;
            ngDialog.open({
                template: 'app/templates/change-avatar-template.html',
                scope: $scope,
                controller: 'ChangeAvatarController'
            });
        };

        $scope.Show = function () {
            //Check Image Has Feed or Not
            var feed = $scope.user.avatar.feed;
            feedService.getFeedByID(feed).then(function (results) {
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