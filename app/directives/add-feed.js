app.directive('addFeed', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/upload-feed.html',
        controller: 'AddFeedController'
    };
}).controller("AddFeedController", ['$scope', 'Upload', '$timeout', 'authService', '$http', 'ngDialog'
    , function ($scope, Upload, $timeout, authService, $http, ngDialog) {
        $scope.auth = authService.authentication;
        $scope.UploadFeed = function (files) {
            $scope.files = files;
            
            if (files == undefined) {
                $http.post('https://ktmsocial.somee.com/api/feed/uploadfeed?username=' + $scope.auth.userName + '&title=' + $scope.title + '&content=' + $scope.content)
                    .then(function (results) {
                        if (results.data == -2) alert(-2);
                        else
                        {
                            var lst = angular.element('#myList');
                            if (lst.lenght == 0) return;
                            else {
                                var scope = lst.scope();
                                 scope.listFeed.unshift(results.data);
                                 ngDialog.closeAll();
                                 $scope.title = undefined;
                                 $scope.content = undefined;
                                 $scope.files = undefined;
                                 
                            }
                        }
                    }, function (err) {
                        alert('error');
                    });
            }
            else
            {
                files.upload = Upload.upload({
                    url: 'https://ktmsocial.somee.com/api/feed/uploadfeed?username=' + $scope.auth.userName + '&title=' + $scope.title + '&content=' + $scope.content,
                    data: { file: files }
                });

                files.upload.then(function (response) {
                    $timeout(function () {
                        files.result = response.data;
                        var lst = angular.element('#myList');
                        if (lst.lenght == 0) return;
                        else
                        {
                            var scope = lst.scope();
                            scope.$apply(function () {
                                scope.listFeed.unshift(response.data);
                                ngDialog.closeAll();

                            });
                              $scope.title = undefined;
                              $scope.content = undefined;
                              $scope.files = undefined;
                        }
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    files.progress = Math.min(100, parseInt(100.0 *
                                             evt.loaded / evt.total));
                });
            }

           
        }
    }]);