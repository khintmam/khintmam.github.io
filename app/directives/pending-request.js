
app.directive('pendingRequest', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/pending-request-template.html',
        controller: 'PendingRequestController'
    };
}).controller('PendingRequestController', ['$scope', 'userService', 'authService', 'ngDialog', 'feedService',
    function ($scope, userService, authService, ngDialog, feedService) {
        $scope.auth = authService.authentication;
        userService.getPendingRequest($scope.auth.userName).then(function (results) {
            if (results.data == -2) alert(-2);
            else
            {
                $scope.requests = results.data;

            }
        });
        $scope.findfriend = false;
        $scope.Active = function () {
            $scope.findfriend = ($scope.findfriend == true ? false : true);
        };

    }]);