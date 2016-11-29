'use strict';
app.factory('imageService', ['$http', function ($http) {

    var serviceBase = 'http://ktmsocialapi.somee.com/';
    var imageServiceFactory = {};

    var _getRecentImage = function (username, type) {

        return $http.post(serviceBase + 'api/image/getrecentimage?username=' + username + '&type=' + type).then(function (results) {
            return results;
        });
    };
    imageServiceFactory.getRecentImage = _getRecentImage;
    return imageServiceFactory;

}]);