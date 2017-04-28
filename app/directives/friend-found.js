
app.directive('friendFound', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/friend-found-template.html',
        controller: 'FriendFoundController',
        scope: {
            user: '='
        }
    };
}).controller('FriendFoundController', ['$scope', 'userService', 'authService', 'ngDialog', 'feedService',
    function ($scope, userService, authService, ngDialog, feedService) {
        $scope.auth = authService.authentication;
        $scope.SendFriendRequest = function (user) {
            userService.sendFriendRequest($scope.auth.userName, user.username).then(function (results) {
                if (results.data == -2) {
                    alert(-2);
                }
                else {
                    user.status = results.data.status;
                    user.user_action = results.data.user_action;
                }
            });

        };
        $scope.SendResponseFriend = function (status) {

            userService.sendResponseFriend($scope.auth.userName, $scope.user.username, status)
                .then(function (results) {
                    if (results.data == -2) alert(-2);
                    else
                    {
                        $scope.user.status = results.data.status;
                        $scope.user.user_action = results.data.user_action;
                    }
                }, function (err) {
                    alert('error');
                    console.log(err);
                });
        };
        $scope.UnFriend = function () {

            ngDialog.open({
                template: 'app/templates/unfriend-confirm-template.html',
                scope: $scope,
                controller: ['$scope', 'userService', function ($scope, userService) {
                    $scope.confirm = function () {
                        this.SendResponseFriend(-1);
                        this.closeThisDialog();
                    };
                }]
            });
        };

        $scope.IsNoRelate = function () {
            return $scope.user.status == -1;
        };
        $scope.IsSendRequest = function () {
            return ($scope.user.status == 0 && $scope.user.user_action == true);
        };
        $scope.IsFriend = function () {
            return ($scope.user.status == 1);
        };
        $scope.IsNeedResponse = function () {
            return ($scope.user.status == 0 && $scope.user.user_action == false);
        };
        $scope.IsDenied = function () {
            return ($scope.user.status == 2 && $scope.user.user_action == true);
        };
        $scope.BeingDenied = function () {
            return ($scope.user.status == 2 && $scope.user.user_action == false);
        };

    }]);