
app.directive('searchFriend', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/search-friend-template.html',
        controller: 'SearchFriendController'
    };
}).controller('SearchFriendController', ['$scope', 'userService', 'authService', 'ngDialog', 'feedService',
    function ($scope, userService, authService, ngDialog, feedService) {
        $scope.auth = authService.authentication;
        if ($scope.$parent.keyword != undefined)
            $scope.keyword = $scope.$parent.keyword;
       
        $scope.$watch('keyword', function (newValue, oldValue) {
            userService.findUserByKeyword(newValue, $scope.auth.userName)
          .then(function (results) {
              if (results.data == -2) alert(-2);
              else {
                  $scope.lstUser = results.data;
              }
          }, function (err) {
              alert('error');
              console.log(err);
          });
        });

        
        userService.findUserByKeyword($scope.keyword, $scope.auth.userName)
            .then(function (results) {
                console.log(results.data);
                if (results.data == -2) alert(-2);
                else {
                    $scope.lstUser = results.data;
                }
            }, function (err) {
                alert('error');
                console.log(err);
            });
       
}]);