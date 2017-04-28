'use strict';
app.factory('userService', ['$http', function ($http) {

    var serviceBase = 'https://ktmsocial.somee.com/';
    var userServiceFactory = {};

    var _getInfoUser = function (username) {

        return $http.post(serviceBase + 'api/home/getinfouser?username=' + username).then(function (results) {
            return results;
        });
    };

    var _getFullInfoUser = function (username) {

        return $http.post(serviceBase + 'api/home/GetFullInfoUser?username=' + username).then(function (results) {
            return results;
        });
    };

    var _UpdateInfoUser = function(username, name, birthdate, sex, bornplace, description){
        return $http.post(serviceBase + 'api/home/UpdateInfoUser?username=' + username
                                                              + '&name=' + name
                                                              + '&birthdate=' + birthdate
                                                              + '&sex=' + sex
                                                              + '&bornplace=' + bornplace
                                                              + '&description=' + description)
                                                              .then(function (results) {
            return results;
        });

    };

    var _getListFriend = function (username) {
        return $http.post(serviceBase + 'api/home/getlistfriend?username=' + username).then(function (results) {
            return results;
        });
    };

    var _findUserByKeyword = function (keyword, username) {
        return $http.post(serviceBase + 'api/home/finduserbykeyword?keyword=' + keyword + '&username=' + username).then(function (results) {
            return results;
        });
    };

    var _sendFriendRequest = function (username, userrequest)
    {
        return $http.post(serviceBase + 'api/home/sendfriendrequest?username=' + username + '&userrequest=' + userrequest).then(function (results) {
            return results;
        });
    }

    var _sendResponseFriend = function (username, userresponse, status) {
        return $http.post(serviceBase + 'api/home/sendfriendresponse?username=' + username
            + '&userresponse=' + userresponse + '&status=' + status).then(function (results) {
            return results;
        });
    };

    var _getPendingRequest = function (username) {
        return $http.post(serviceBase + 'api/home/getpendingrequest?username=' + username).then(function (results) {
            return results;
        });
    };


    userServiceFactory.getInfoUser = _getInfoUser;
    userServiceFactory.getFullInfoUser = _getFullInfoUser;
    userServiceFactory.updateInfoUser = _UpdateInfoUser;
    userServiceFactory.getListFriend = _getListFriend;
    userServiceFactory.findUserByKeyword = _findUserByKeyword;
    userServiceFactory.sendFriendRequest = _sendFriendRequest;
    userServiceFactory.sendResponseFriend = _sendResponseFriend;
    userServiceFactory.getPendingRequest = _getPendingRequest;
    return userServiceFactory;

}]);