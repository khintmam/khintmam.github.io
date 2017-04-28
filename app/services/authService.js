'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', '$location', 'userService', 'notiService'
    , function ($http, $q, localStorageService, $location, userService, notiService) {
 
    var serviceBase = 'https://ktmsocial.somee.com/';
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
                console.log('error get info user');
            });

            notiService.getNoti(_authentication.userName).then(function (results) {
                if (results.data == -2) alert(-2);
                var scope = angular.element('#modalNoti').scope();
                scope.$applyAsync(function () {
                    scope.noties = results.data.lstNoti;
                    scope.length = results.data.length;
                    scope.noti_length = results.data.length_new;
                    console.log(results.data);
                });
            },
            function (error) {
                console.log('error get noti user');
                console.log(error);
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
        var userLogout = _authentication.userName;
        var interval = setInterval(function () {
            if (isHubStart == true) {
                myHub.invoke('logOut', userLogout);
                clearInterval(interval);
            }
        }, 1000);
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