var isHubStart = false;

var connection = $.hubConnection('http://ktmsocialapi.somee.com/signalr', { userDefaultPath: false });
    var myHub = connection.createHubProxy('notiHub');
    myHub.on("NotiAddComment", function (newcomment) {
        var lstElement = $('.feed-id-' + newcomment.feedID);
        for (var i = 0; i < lstElement.length; i++)
        {
            var $scope = angular.element(lstElement[i]).scope();
            $scope.$apply(function () {
                $scope.feed.comments.push(newcomment);

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

    myHub.on("SendNotWriting", function (conversation) {
        var chatboxs = angular.element('.chat-conversation-' + conversation);
        for (var i = 0; i < chatboxs.length; i++) {
            $scope = chatboxs.eq(i).scope();
            $scope.$apply(function () {
                $scope.isWriting = 0;
            });
        }
    });

connection.start().done(function () {
    console.log('Now connected, connection ID=' + connection.id);
    //Send username to map hub
    isHubStart = true;
}).fail(function () { console.log('Could not connect'); });