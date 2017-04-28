app.directive('modalNoti', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/modal-notification.html',
        controller: 'ModalNotiController'
    };
}).controller("ModalNotiController", ['$scope', 'authService', 'ngDialog', 'notiService',
function ($scope, authService, ngDialog, notiService) {
     $scope.IsLoadMore = false;
     $scope.auth = authService.authentication;
     $scope.Hide = function () {
         $scope.noties.splice(4);
     };
     $scope.Clear = function () {
         $scope.noties.splice(0);
     };
     $scope.GetMore = function () {
         $scope.IsLoadMore = true;
         notiService.getMoreNoti($scope.noties[$scope.noties.length - 1].id, $scope.auth.userName)
            .then(function (results) {
                if (results.data == -2) alert(-2);
                else
                {
                    $scope.noties.push.apply($scope.noties, results.data);
                    $scope.IsLoadMore = false;
                }
            });
     };
     notiService.getNoti($scope.auth.userName).then(function (results) {
         if (results.data == -2) alert(-2);
         $scope.noties = results.data.lstNoti;
         $scope.length = results.data.length;
         var scope = angular.element('#StatusNewQty').scope();
         scope.$applyAsync(function () {
             scope.noti_length = results.data.length_new;

         });
         console.log(results.data);
     },
     function (error) {
         alert('error');
         console.log(error);
     });

     
 }]);