/// <reference path="../templates/change-avatar-template.html" />
app.directive('changeAvatarBox', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/change-avatar-template.html',
        controller: 'ChangeAvatarController'
    };
}).controller("ChangeAvatarController", ['$scope','Upload', '$timeout', 'ngDialog',
    function ($scope, Upload, $timeout, ngDialog) {
        $scope.Change = function (files) {
            $scope.file = files;
                files.upload = Upload.upload({
                    url: 'https://ktmsocial.somee.com/api/feed/changeavatar?username=' + $scope.auth.userName + '&content=' + $scope.content,
                    data: { file: files }
                });
                files.upload.then(function (response) {
                    $timeout(function () {
                        if (response.data == -2) alert(-2);
                        var feed = response.data.feed;
                        var new_avatar = response.data.avatar;

                        //Process new feed;
                        var lst = angular.element('#myList');
                        if (lst.lenght == 0) return;
                        else {
                            var scope = lst.scope();
                            scope.listFeed.unshift(feed);
                        }
                        //Process avatar;
                        angular.element('#myList').scope().user.avatar = new_avatar;
                        ngDialog.closeAll();




                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    files.progress = Math.min(100, parseInt(100.0 *
                                             evt.loaded / evt.total));
                });

        }
}]);