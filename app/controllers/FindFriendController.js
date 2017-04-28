app.controller('FindFriendController', ['authService', 'userService', '$scope', '$routeParams', 'ngDialog',
function (authService, userService, $scope, $routeParams, ngDialog) {
        $scope.auth = authService.authentication;
        $scope.keyword = $routeParams.keyword;
       
    }
]);