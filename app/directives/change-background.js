/// <reference path="../templates/change-avatar-template.html" />
app.directive('changeBackground', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/change-backround-template.html',
        controller: 'ChangeBackgroundController'
    };
}).controller("ChangeBackgroundController", ['$scope', 'Upload', '$timeout', 'ngDialog',
    function ($scope, Upload, $timeout, ngDialog) {
        $scope.Change = function (files) {
            $scope.file = files;
            files.upload = Upload.upload({
                url: 'https://ktmsocial.somee.com/api/feed/ChangeBackground?username=' + $scope.auth.userName + '&content=' + $scope.content,
                data: { file: files }
            });
            files.upload.then(function (response) {
                $timeout(function () {
                    if (response.data == -2) alert(-2);
                    var feed = response.data.feed;
                    var new_bgUser = response.data.bgUser;

                    //Process new feed;
                    var lst = angular.element('#myList');
                    if (lst.lenght == 0) return;
                    else {
                        var scope = lst.scope();
                        scope.listFeed.unshift(feed);
                    }
                    //Process avatar;
                    angular.element('#myList').scope().user.bgUser = new_bgUser;
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