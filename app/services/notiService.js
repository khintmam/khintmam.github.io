'use strict';
app.factory('notiService', ['$http', function ($http) {

    var serviceBase = 'https://ktmsocial.somee.com/';
    var notiServiceFactory = {};

    var _getNoti = function (username) {

        return $http.post(serviceBase + 'api/noti/getnoti?username=' + username).then(function (results) {
            return results;
        });
    };
    var _getMoreNoti = function (lastnoti, username) {
        return $http.post(serviceBase + 'api/noti/getmorenoti?lastNoti=' + lastnoti + '&username=' + username).then(function (results) {
            return results;
        });
    };
    var _getQtyNewNoti = function (username) {
        return $http.post(serviceBase + 'api/noti/getQtyNewNoti?username=' + username)
            .then(function (results) { return results;});
    };
    var _updateStatus = function (id) {
        return $http.post(serviceBase + 'api/noti/updateStatus?id=' + id)
          .then(function (results) { return results; });
    };
    notiServiceFactory.getNoti = _getNoti;
    notiServiceFactory.getMoreNoti = _getMoreNoti;
    notiServiceFactory.getQtyNewNoti = _getQtyNewNoti;
    notiServiceFactory.updateStatus = _updateStatus;

    return notiServiceFactory;

}]);