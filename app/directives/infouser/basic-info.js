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
}).controller('BasicInfoController', ['$scope', 'authService', 'ngDialog',
    function ($scope, authService, ngDialog) {
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
            $scope.feed = $scope.user.avatar.feed;
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
            });
        };
  
}]);