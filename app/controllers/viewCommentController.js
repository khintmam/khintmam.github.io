'use strict';
app.controller('ViewCommentController', ['$scope', 'sharedPropService', function ($scope, sharedPropService) {
    $scope.cmt = sharedPropService.CurEditComment;

}]);