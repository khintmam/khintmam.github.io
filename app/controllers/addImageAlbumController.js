app.controller("AddImageAlbumController", ['$scope','Upload', '$timeout', 'ngDialog', 'authService',
    function ($scope, Upload, $timeout, ngDialog, authService) {
        $scope.ispost = true;
        $scope.UploadImage = function () {
            $scope.auth = authService.authentication;
            files = $scope.files;
            files.upload = Upload.upload({
                url: 'https://ktmsocial.somee.com/api/feed/imagetoalbum?username=' + $scope.auth.userName 
                        + '&album=' + $scope.album.id + '&ispost=' + $scope.ispost
                        + '&content=' + $scope.content,
                data: { file: files }
            });
            files.upload.then(function (response) {
                $timeout(function () {
                    var images = response.data;
                    var n = images.length;

                    for (var i = 0; i < n; i++) {
                        $scope.album.images.unshift(images[i]);
                    }
                    $scope.album.images_length += images.length;
                    ngDialog.closeAll();
                    ngDialog.open({
                        template: '<ul><li class="li-noti">Thêm ảnh thành công rồi nhé mắm :)</li></ul>',
                        plain: true

                    });
                    $scope.UpdateState();
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                files.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });

        };


}]);