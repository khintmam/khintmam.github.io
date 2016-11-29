'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', '$location', 'userService'
    , function ($http, $q, localStorageService, $location, userService) {
 
    var serviceBase = 'http://ktmsocialapi.somee.com/';
    var authServiceFactory = {};
 
    var _authentication = {
        isAuth: false,
        userName: "",
        avatar: "",
        name: "",
    };
 
    var _saveRegistration = function (registration) {
 
        _logOut();
 
        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });
 
    };
 
    var _login = function (loginData) {
 
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
 
        var deferred = $q.defer();
 
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
 
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
 
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;


            var interval = setInterval(function () {
                if (isHubStart == true) {
                    myHub.invoke('sendNewConnect', _authentication.userName);
                    clearInterval(interval);
                }
            }, 1000);

            userService.getInfoUser(_authentication.userName).then(function (results) {
                _authentication.avatar = results.data.avatar;
                _authentication.name = results.data.name;
            }, function (err) {
                alert('error');
            });
           
            deferred.resolve(response);
 
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });
 
        return deferred.promise;
 
    };
 
    var _logOut = function () {
 
        localStorageService.remove('authorizationData');
        myHub.invoke('logOut', _authentication.userName);
        _authentication.isAuth = false;
        _authentication.userName = "";
       

 
    };
 
    var _fillAuthData = function () {
 
        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;

            var interval = setInterval(function () {
                if (isHubStart == true)
                {
                    myHub.invoke('sendNewConnect', _authentication.userName);
                    clearInterval(interval);
                }
            }, 1000);
          
           
        }
        userService.getInfoUser(_authentication.userName).then(function (results) {
            _authentication.avatar = results.data.avatar;
            _authentication.name = results.data.name;
        }, function (err) {
            alert('error');
        });
        
 
    }
 
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
 
    return authServiceFactory;
}]);