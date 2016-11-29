app.directive('editInfo', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/user-info/edit-info-template.html',
        scope: {
            user: '='
        },
        controller: 'EditInfoController'
    };
}).controller('EditInfoController', ['$scope', 'userService', 'ngDialog', function ($scope, userService, ngDialog) {
    var date = $scope.user.birthDate.split('/');
    
    $scope.birthDate = new Date(date[2], Number(date[1]) - 1, date[0]);
    $scope.UpdateInfo = function(){
        var newDate = $scope.birthDate.getDate() + '/' 
        + ($scope.birthDate.getMonth() + 1) 
        + '/' + $scope.birthDate.getFullYear();
        userService.updateInfoUser($scope.user.username, 
            $scope.info.name,
            newDate,
            $scope.info.sex,
            $scope.info.bornPlace,
            $scope.info.description).then(function(results){
                if (results.data == -2) alert(-2);
                else
                {
                    console.log(results.data);
                    angular.copy($scope.info, $scope.user);
                    $scope.user.birthDate = newDate;
                    
                    ngDialog.closeAll();
                }
            }, function(err){
                alert('error');
                console.log(err);
            });
    };
}]);