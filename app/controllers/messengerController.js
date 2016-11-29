app.controller('messengerController', ['$scope', 'messengerService', 'authService',
    function ($scope, messengerService, authService) {
 
        $scope.authentication = authService.authentication;
        $scope.conversation = {};
        $scope.chat = {};
        $scope.ChangeChat = function(index)
        {
            $scope.chat = $scope.conversation[index];
            
        }
        messengerService.getConversation($scope.authentication.userName)
            .then(function (results) {
                if (results.data == -2) alert(-2);
                else
                {
                    $scope.conversation = results.data;
                    $scope.chat = $scope.conversation[0];
                    console.log($scope.chat);
                }
            }, function (error) {
                alert('error');
            });
}]);