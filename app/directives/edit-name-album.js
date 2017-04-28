app.directive('editNameAlbum', function () {
    return {
        restrict: 'E',
        scope: {
            album: '='
        },
        templateUrl: '/app/templates/edit-name-album-template.html',
        controller: 'EditNameAlbumController'
    };
}).controller("EditNameAlbumController", ['$scope', 'ngDialog', 'imageService',
 function ($scope, ngDialog, imageService) {

     $scope.ChangeNameAlbum = function () {
         var id = $scope.album.id;
         var name = $scope.newname;
         console.log(name);
         imageService.changeNameAlbum(id, name).then(function (results) {

             if (results.data == -2) alert(-2);
             else
             {
                 $scope.album.nameAlbum = name;

                 ngDialog.closeAll();
                 ngDialog.open({
                     template: '<ul><li class="li-noti">Cập nhật tên thành công rồi nhé mắm :p</li></ul>',
                     plain: true

                 });
             }
         }, function (err) {
             alert('err');
             console.log(err);
         });

     };
 }]);