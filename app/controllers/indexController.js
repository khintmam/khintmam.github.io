'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', 'ngDialog', 'notiService',
    function ($scope, $location, authService, ngDialog, notiService) {
        $scope.keyword = '';
        $scope.logOut = function () {
            authService.logOut();
            $location.path('/home');
        }
        $scope.authentication = authService.authentication;
        $scope.OpenNoti = function () {
            $('#modalNoti').modal();
        };
        $scope.Search = function (keyword)
        {
            $location.path('/findfriend/' + keyword);
        }
}]);


