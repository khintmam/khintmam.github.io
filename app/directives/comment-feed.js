app.directive('commentFeed', function () {
    return {
        restrict: 'E',
        scope: {
            info: '='
        },
        templateUrl: '/app/templates/comment-feed-template.html',
        controller: 'CommentFeedController'
    };
}).controller("CommentFeedController", ['$scope', 'authService', 'sharedPropService',
    function ($scope, authService, sharedPropService) {
    $scope.ismouseover = 0;
    //Check xem comment có được edit không
    $scope.isYourComment = function (cmtUsername) {
        if (cmtUsername === authService.authentication.userName) return true;
        return false;
    };
    
    $scope.ShowInfo = function () {
        ngDialog.open({
            template: '/app/templates/modal-view-comment.html',
            controller: 'ViewCommentController',
            scope: $scope
        });
    };
    $scope.ShowEdit = function () {
        angular.copy($scope.info, sharedPropService.CurEditComment);
        ngDialog.open({
            template: '/app/templates/edit-comment-form.html',
            controller: 'EditCommentController'
        });
    };
   
  
  
}]);