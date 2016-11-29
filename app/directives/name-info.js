app.directive('nameInfo', function () {
    return {
        restrict: 'E',
        scope: {
            username: '=',
            name: '='
        },
        templateUrl: '/app/templates/name-info-template.html',
        controller: 'NameInfoController'
    };
}).controller("NameInfoController", ['$scope', 'messengerService', 'authService', 'ngDialog', '$location',
    function ($scope, messengerService, authService, ngDialog, $location) {
       
        $scope.mouseleave = function () {
            $scope.ismouseover = 0;
        };
        $scope.mouseover = function () {
            $scope.ismouseover = 1;
        };
        $scope.InfoUser = function (username) {
            $location.path('/user/' + username);
            ngDialog.closeAll();
        };
        $scope.ShowChat = function () {
                messengerService.getConversation1(authService.authentication.userName, $scope.username)
                    .then(function (results) {
                        if (results.data == -2) alert(-2);
                        else
                        {
                        
                            $scope.chat = results.data;
                            ngDialog.open({
                                template: '/app/templates/chat-box-template.html',
                                controller: 'ChatBoxController',
                                scope: $scope
                            });
                        }
                    }, function (error) {
                        alert('error');
                    });
            };


    }]);