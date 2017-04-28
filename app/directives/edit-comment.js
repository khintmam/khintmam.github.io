app.directive('editComment', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/templates/edit-comment-form.html',
        controller: 'EditCommentController'
    };
}).controller("EditCommentController", ['$scope', 'authService', 'sharedPropService', 'commentService', 'ngDialog',
    function ($scope, authService, sharedPropService, commentService, ngDialog) {
        $scope.cmt = sharedPropService.CurEditComment;
       
        $scope.EditComment = function () {

            commentService.updateComment($scope.cmt).then(function (results) {
                if (results.data == -2) {
                    alert(-2);
                }
                else {
                    ngDialog.open({
                        template: 'Mắm đã sửa bình luận thành công !!!',
                        plain: true
                    });
                    var commentTarget = $('.comment-id-' + $scope.cmt.id);
                    for (var i = 0; i < commentTarget.length; i++)
                    {
                        angular.copy($scope.cmt, commentTarget.eq(i).scope().info);
                    }
                    
                }
            }, function (error) {
                alert('error');
            });
            
        };
       
}]);