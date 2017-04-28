app.controller("ViewAlbumController", ['$scope', 'imageService',
    'authService', 'ngDialog', '$routeParams', '$location',
function ($scope, imageService, authService, ngDialog, $routeParams, $location) {
     $scope.auth = authService.authentication;
     if ($scope.auth.userName == $routeParams.username)
     {
         $location.path('/album');
     }
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

     imageService.getAlbumByUser($routeParams.username).then(function (results) {
         $scope.listAlbum = results.data;
         $scope.activeAlbum = $scope.listAlbum[0];
         $scope.UpdateState();


     }, function (err) {
         alert(err);
         console.log(err);
     });






 }]);