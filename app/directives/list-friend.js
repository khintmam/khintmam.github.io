app.directive('listFriend', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/list-friend-template.html',
        scope: {
            username: '='
        },
        controller: 'ListFriendController'
    };
}).controller("ListFriendController", ['$scope', 'ngDialog', 'userService', 'authService',
function ($scope, ngDialog, userService, authService) {

    var interval = setInterval(function () {
        if ($scope.username == undefined) return;
        else {
            clearInterval(interval);
            userService.getListFriend($scope.username).then(function (results) {
                if (results == -2) alert(-2);
                else {
                    $scope.listFriend = results.data;
                }
            }, function (err) {
                alert('error');
                console.log(err);
            });
        }
    }, 100);

    $scope.ShowSearchFriend = function () {

        ngDialog.open(
            {
                template: 'app/templates/search-friend-template.html',
                controller: 'SearchFriendController'
            }
        );
    };
       
}]);