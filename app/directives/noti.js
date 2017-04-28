app.directive('noti', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/noti-template.html',
        controller: 'NotiController',
        scope: {
            data: '='
        }
    };
}).controller('NotiController', ['$scope', '$location', 'authService', 'feedService', 'messengerService', 'ngDialog', 'notiService'
    , function ($scope, $location, authService, feedService, messengerService, ngDialog, notiService) {

        $scope.auth = authService.authentication;
        $scope.isLoad = false;
        $scope.ViewNoti = function () {
            $scope.isLoad = true;
            //Open noti
            switch ($scope.data.typeTarget)
            {
                case 1: {
                    var feedid = Number($scope.data.messageTarget);
                    feedService.getFeedByID(feedid).then(function (results) {
                        $scope.feed = results.data;
                        ngDialog.open({
                            template: '/app/templates/feed-item-template.html',
                            controller: 'FeedController',
                            scope: $scope
                        });
                        $scope.isLoad = false;
                    }, function (err) {
                        alert(err);
                        console.log(err);
                    });
                    break;
                }
                case 2: {
                    var userTarget = $scope.data.messageTarget;
                    messengerService.getConversation1($scope.auth.userName, userTarget)
                       .then(function (results) {
                           if (results.data == -2) alert(-2);
                           else {

                               $scope.chat = results.data;
                               ngDialog.open({
                                   template: '/app/templates/chat-box-template.html',
                                   controller: 'ChatBoxController',
                                   scope: $scope
                               });
                               $scope.isLoad = false;
                           }
                       }, function (error) {
                           alert('error');
                       });
                    break;
                }
                case 3: {
                    var linkTarget = $scope.data.messageTarget;
                    $scope.isLoad = false;
                    ngDialog.closeAll();
                    $location.path(linkTarget);
                    $('#modalNoti').modal('hide');
                    break;
                    

                }
                case 4: {
                    ngDialog.open({
                        template: '/app/templates/pending-request-template.html',
                        controller: 'PendingRequestController',
                    });
                    $scope.isLoad = false;
                    $('#modalNoti').modal('hide');
                    break;
                }
                    
            }

           
            if ($scope.data.status == 0) {
                notiService.updateStatus($scope.data.id).then(function (results) {
                    if (results.data == -2) alert(-2);
                    else
                    {
                        $scope.data.status = 1;
                        var scope = $scope.$parent.$parent;
                        scope.$applyAsync(function(){
                            scope.noti_length = scope.noti_length - 1;
                        });
                        

                    }
                }, function (error) {
                    alert(error);
                    console.log(error);
                })
            }
            
      
        };
}]);