app.controller("MessengerPersonController", ['$scope', 'messengerService', 'authService', '$routeParams',
function ($scope, messengerService, authService, $routeParams) {
        $scope.auth = authService.authentication;
        $scope.username = $routeParams.username;
        messengerService.getConversation1(authService.authentication.userName, $scope.username)
                   .then(function (results) {
                       if (results.data == -2) alert(-2);
                       else {

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
}]);