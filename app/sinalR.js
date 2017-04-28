

var connection = $.hubConnection('https://ktmsocial.somee.com/signalr', { userDefaultPath: false });
    var myHub = connection.createHubProxy('notiHub');
    myHub.on("NotiAddComment", function (newcomment) {
        var lstElement = $('.feed-id-' + newcomment.feedID);
        for (var i = 0; i < lstElement.length; i++)
        {
            var $scope = angular.element(lstElement[i]).scope();
            $scope.$apply(function () {
                $scope.feed.comments.push(newcomment);
                $scope.feed.cmtQty = $scope.feed.cmtQty + 1;
            });
        }
    });
    myHub.on("NotiSendMessage", function (newmessage) {
       
        var chatboxs = angular.element('.chat-conversation-' + newmessage.conversationID);
        for (var i = 0; i < chatboxs.length; i++)
        {
            $scope = chatboxs.eq(i).scope();
            $scope.$apply(function () {
                $scope.chat.conversation.messages.push(newmessage);
                $scope.chat.conversation.length = $scope.chat.conversation.length + 1;
            });
        }

    });
    myHub.on("SendIsWriting", function (conversation) {
        var chatboxs = angular.element('.chat-conversation-' + conversation);
        for (var i = 0; i < chatboxs.length; i++) {
            $scope = chatboxs.eq(i).scope();
            $scope.$apply(function () {
                $scope.isWriting = 1;
            });
        }
    });
    myHub.on("SendNotiNewFeed", function (newfeed) {
        var $scope = angular.element('#myList').scope();
        $scope.$apply(function () {
            $scope.listFeed.unshift(newfeed);
        });
        
    });

    myHub.on("UpdateStatusRelationship", function (username, status, user_action) {
        var friends = angular.element('.friend-info-' + username);
        for (var i = 0; i < friends.length; i++) {
            $scope = friends.eq(i).scope();
            $scope.$apply(function () {
               $scope.user.status = status;
               $scope.user.user_action = user_action;
            });
        }

    });

    myHub.on("SendNotWriting", function (conversation) {
        var chatboxs = angular.element('.chat-conversation-' + conversation);
        for (var i = 0; i < chatboxs.length; i++) {
            $scope = chatboxs.eq(i).scope();
            $scope.$apply(function () {
                $scope.isWriting = 0;
            });
        }
    });
    myHub.on('SendNewNoti', function (newnoti) {
        var $scope = angular.element('#modalNoti').scope();
        $scope.$apply(function () {
            $scope.noties.unshift(newnoti);
            $scope.length = $scope.length + 1;
            $scope.noti_length = $scope.noti_length + 1;
        });
    });
    


connection.start().done(function () {
    console.log('Now connected, connection ID=' + connection.id);
    //Send username to map hub
    isHubStart = true;
}).fail(function () { console.log('Could not connect'); });