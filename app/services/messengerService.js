'use strict';
app.factory('messengerService', ['$http', function ($http) {

    var serviceBase = 'http://ktmsocialapi.somee.com/';
    var messengerFactory = {};

    var _getConversation = function (username) {

        return $http.post(serviceBase + 'api/messenger/getinfomessenger?CurUsername=' + username).then(function (results) {
            return results;
        });
    };
    var _sendNewMessage = function (conversation, username, content) {
        return $http.post(serviceBase + 'api/messenger/sendnewmessage?conversation='
                    + conversation + '&username=' + username + '&content=' + content).then(function (results) {
            return results;
        });
    };

    var _getMoreMessage = function (firstid, conversation) {
        
        return $http.get(serviceBase + 'api/messenger/getmoremessage?id=' + firstid
                    + '&conversation=' + conversation).then(function (results) {
                       return results;
                   });
    };
    var _getAllMessage = function (conversation) {
        return $http.get(serviceBase + 'api/messenger/getallmessage?conversation=' + conversation).then(function (results) {
                       return results;
                   });
    };

    var _getConversation1 = function (username1, username2) {
        return $http.post(serviceBase + 'api/messenger/GetConversation?username1='
                   + username1 + '&username2=' + username2).then(function (results) {
                       return results;
                   });

    };

    messengerFactory.getConversation = _getConversation;
    messengerFactory.sendNewMessage = _sendNewMessage;
    messengerFactory.getMoreMessage = _getMoreMessage;
    messengerFactory.getAllMessage = _getAllMessage;
    messengerFactory.getConversation1 = _getConversation1;

    return messengerFactory;

}]);