app.directive('listAlbum', function () {
    return {
        restrict: 'E',
        scope: {
            albums: '=',
            active: '=',
            iscuruser: '='
        },
        templateUrl: '/app/templates/list-album-template.html',
        controller: 'ListAlbumController'
    };
}).controller("ListAlbumController", ['$scope', 'authService', 'ngDialog',
 function ($scope, authService, ngDialog) {
     $scope.auth = authService.authentication;
     $scope.UpdateState = function (scoll) {
         setTimeout(function () {
             new AnimOnScroll(document.getElementById('grid'), {
                 minDuration: 0.4,
                 maxDuration: 0.6,
                 viewportFactor: 0.2
             });
             if (scoll != undefined) {
                 scoll();
             }
         }, 100);
     };
     $scope.changeActive = function (index) {
         $scope.active = $scope.albums[index];
         $scope.UpdateState(function () {
             $('html, body').animate({ scrollTop: '+=300px' }, 100);
         });
     };
     $scope.AddNewAlbum = function () {
         ngDialog.open({
             controller: 'CreateNewAlbumController',
             template: '/app/templates/create-new-album-template.html',
             scope: $scope
         });
     };
}]);