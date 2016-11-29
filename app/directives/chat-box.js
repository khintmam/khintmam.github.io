app.directive('chatBox', function () {
    return {
        restrict: 'E',
        scope: {
            chat: '='
        },
        templateUrl: '/app/templates/chat-box-template.html',
        controller: 'ChatBoxController'
    };
}).controller("ChatBoxController", ['$scope', 'messengerService', 'authService',
    function ($scope, messengerService, authService) {
        $scope.isWriting = 0;
        $scope.$watch('newMessage', function (newValue, oldValue) {
            if (newValue != undefined && oldValue == undefined && isHubStart == true)
            {
                //Send message to server to object is writing...
                
                myHub.invoke('sendWriting', $scope.chat.conversation.conversationID, $scope.chat.username);
            }
            if ($scope.chat.conversation != undefined &&  newValue == undefined && isHubStart == true)
            {
                //Send message to server to object do'nt wrting...
                myHub.invoke('sendNotWriting', $scope.chat.conversation.conversationID, $scope.chat.username);
            }
        });
        $scope.beingLoadAll = 0; //check chatbox being load all or not
        $scope.beingLoadMore = 0;
        $scope.authentication = authService.authentication;
        $scope.ViewMore = function () {
            $scope.beingLoadMore = 1;
            messengerService.getMoreMessage($scope.chat.conversation.messages[0].messageID,
                $scope.chat.conversation.conversationID)
                        .then(function (results) {
                            if (results.data == -2) alert(-2);
                            else if (results.data == -1) alert(-1);
                            else {
                                var messages = results.data;
                                for (var i = messages.length - 1; i >= 0; i--) {
                                    $scope.chat.conversation.messages.unshift(messages[i]);
                                }

                            }
                            $scope.beingLoadMore = 0;
                        }, function (error) {
                            alert('error');
                            $scope.beingLoadMore = 0;
                        });
        };
        $scope.ViewAll = function () {
            $scope.beingLoadAll = 1;
            messengerService.getAllMessage($scope.chat.conversation.conversationID)
                        .then(function (results) {
                            if (results.data == -2) alert(-2);

                            else {
                                var messages = results.data;
                                $scope.chat.conversation.messages = messages;
                            }
                            $scope.beingLoadAll = 0;
                        }, function (error) {
                            alert('error');
                            $scope.beingLoadAll = 0;
                        });
        };
        $scope.HideLess = function () {
            $scope.chat.conversation.messages
                .splice(0, $scope.chat.conversation.messages.length - (5));
        };
        $scope.HasContent = function () {
            return $scope.newMessage != undefined;
        };
        $scope.SendMessage = function () {
            messengerService.sendNewMessage($scope.chat.conversation.conversationID,
                $scope.authentication.userName, $scope.newMessage)
                .then(function (results) {
                    if (results.data == -2) alert(-2);
                    else //success
                    {
                        $scope.newMessage = undefined;
                    }
                }, function (err) {
                    alert('error');
                });
        };

}]);