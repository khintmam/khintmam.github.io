'use strict';
app.factory('imageService', ['$http', function ($http) {

    var serviceBase = 'https://ktmsocial.somee.com/';
    var imageServiceFactory = {};

    var _getRecentImage = function (username, type) {

        return $http.post(serviceBase + 'api/image/getrecentimage?username=' + username + '&type=' + type).then(function (results) {
            return results;
        });
    };

    var _getAlbumByUser = function(username){
         return $http.post(serviceBase + 'api/image/getalbumbyuser?username=' + username).then(function (results) {
            return results;
        });
    };

    var _getMoreImageFromAlbum = function(idalbum, lastimage){
        return $http.post(serviceBase + 'api/image/GetMoreImageFromAlbum?idalbum='
         + idalbum 
         + '&lastimage=' + lastimage).then(function (results) {
                    return results;
                });

    };
    var _changeNameAlbum = function (id, name)
    {
        return $http.post(serviceBase + 'api/image/changenamealbum?id=' + id + '&name=' + name).then(function (results) {
            return results;
        });
    }

    var _createNewAlbum = function (name, username) {
        return $http.post(serviceBase + 'api/image/createnewalbum?name=' + name + '&username=' + username).then(function (results) {
            return results;
        });
    };
    imageServiceFactory.getRecentImage = _getRecentImage;
    imageServiceFactory.getAlbumByUser = _getAlbumByUser;
    imageServiceFactory.getMoreImageFromAlbum = _getMoreImageFromAlbum;
    imageServiceFactory.changeNameAlbum = _changeNameAlbum;
    imageServiceFactory.createNewAlbum = _createNewAlbum;
    return imageServiceFactory;

}]);