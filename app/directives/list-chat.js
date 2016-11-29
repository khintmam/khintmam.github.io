app.directive('listChat', function () {
    return {
        restrict: 'E',
        scope: {
            conversation: '='
        },
        templateUrl: '/app/templates/list-chat-template.html',
        controller: 'ListChatController'
    };
}).controller("ListChatController", ['$scope', 'messengerService', 'authService',
    function ($scope, messengerService, authService) {
        $scope.curIndex = 0;
        $scope.authentication = authService.authentication;
        $scope.ChangeChat = function (index) {
            $scope.$parent.ChangeChat(index);
            $scope.curIndex = index;
        };
       
    }]);