
app.directive('moreInfo', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/user-info/more-info.html',
        scope: {
            user: '='
        },
        controller: 'MoreInfoController'
    };
}).controller('MoreInfoController', ['$scope', 'ngDialog', 'authService',
    function ($scope, ngDialog, authService) {
        $scope.auth = authService.authentication;
        $scope.ShowEdit = function () {
            $scope.info = {};
            angular.copy($scope.user, $scope.info);
            ngDialog.open({
                template: 'app/templates/edit-info-template.html',
                scope: $scope,
                controller: 'EditInfoController'
            });
        };
         $scope.IsCurrUser = function () {
            return $scope.auth.userName == $scope.user.username;
        };
        
    
}]);