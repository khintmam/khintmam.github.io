app.directive('createNewAlbum', function () {
    return {
        restrict: 'E',
        scope: {
            album: '='
        },
        templateUrl: '/app/templates/create-new-album-template.html',
        controller: 'CreateNewAlbumController'
    };
}).controller("CreateNewAlbumController", ['$scope', 'ngDialog', 'imageService', 'authService',
function ($scope, ngDialog, imageService, authService) {
     $scope.AddNew = function () {
         imageService.createNewAlbum($scope.newname, authService.authentication.userName)
            .then(function (results) {
                if (results.data == -2) alert(-2);
                else {
                    var album = results.data;
                    $scope.albums.push(album);
                    $scope.$parent.$parent.activeAlbum = album;
                    ngDialog.closeAll();
                    ngDialog.open({
                        template: '<ul><li class="li-noti">Thêm album ' + album.nameAlbum + ' thành công :p</li></ul>',
                        plain: true

                    });

                }
            }, function (err) {
                alert('error');
                console.log(err);
            });
     }
   
 }]);