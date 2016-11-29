'use strict';
app.factory('userService', ['$http', function ($http) {

    var serviceBase = 'http://ktmsocialapi.somee.com/';
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
    userServiceFactory.getInfoUser = _getInfoUser;
    userServiceFactory.getFullInfoUser = _getFullInfoUser;
    userServiceFactory.updateInfoUser = _UpdateInfoUser;
    
    return userServiceFactory;

}]);