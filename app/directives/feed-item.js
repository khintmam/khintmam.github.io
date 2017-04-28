app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive("feedItem", function () {
    return {
        restrict: 'E',
        scope: {
            feed: '=',
            disable: '='
        },
        templateUrl: '/app/templates/feed-item-template.html',
        controller: 'FeedController'
    };
}).controller("FeedController", ['$scope', 'commentService', 'authService', 'feedService', 'ngDialog', '$location', 'imageService',
    function ($scope, commentService, authService, feedService, ngDialog, $location, imageService) {
        //init
        $scope.isloadall = false;
        $scope.isloadmore = false;
        $scope.newMessage = '';
        $scope.authentication = authService.authentication;
        //Like feed
        $scope.LikeFeed = function () {
            feedService.likeFeed($scope.feed.id, $scope.authentication.userName).then(function (results) {
                if (results.data == -2) alert(-2);
                else
                    $scope.feed.like = results.data;
            }, function (error) {
                alert('error');
            });
        };
        //Sad feed
        $scope.SadFeed = function () {
            feedService.sadFeed($scope.feed.id, $scope.authentication.userName).then(function (results) {
                if (results.data == -2) alert(-2);
                else
                    $scope.feed.sad = results.data;
            }, function (error) {
                alert('error');
            });
        };
        //Add comment
        $scope.SendComment = function () {
            commentService.addComment($scope.feed.id, $scope.newMessage, $scope.authentication.userName).then(function (results) {
                $scope.newMessage = '';
            }, function (error) {
                alert(error);
            });
        };
        $scope.HideComment = function () {
            $scope.feed.comments.splice(0, $scope.feed.comments.length - (3));

        };

        $scope.GetMoreComment = function () {
            $scope.isloadmore = true;
            commentService.getMoreComment($scope.feed.id, $scope.feed.comments.length).then(function (results) {
                var data = results.data;
                if (data == -1) alert(-1);
                else if (data == -2) alert(-2);
                else {
                    for (var i = data.length - 1; i >= 0; i--) {
                        $scope.feed.comments.unshift(data[i]);
                        $scope.isloadmore = false;

                    }
                }
            });
        };
        $scope.GetAllComment = function () {
            $scope.isloadall = true;
            commentService.getAllComment($scope.feed.id).then(function (results) {
                if (results.data == -2) alert(-2);
                else {
                    $scope.feed.comments = results.data;
                    $scope.isloadall = false;

                }
            }, function (error) {
                alert('error');
            });
        };
        $scope.isHaveOldComment = function () {
            if ($scope.feed == undefined) return false;
            return $scope.feed.comments.length < $scope.feed.cmtQty;
        };
        $scope.CanHideComment = function () {
            if ($scope.feed == undefined) return false;
            return ($scope.feed.comments.length > 3)
        }
        $scope.ViewFeed = function () {
            if ($scope.feed.image_Qty > 1) {
                $scope.ViewImageByFeed();
            }
            else {
                ngDialog.open({
                    template: '/app/templates/feed-item-modal-template.html',
                    controller: 'FeedController',
                    scope: $scope
                });
            }
        };
        $scope.ForceViewFeed = function () {

            ngDialog.open({
                template: '/app/templates/feed-item-modal-template.html',
                controller: 'FeedController',
                scope: $scope
            });
        };
        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
        $scope.ViewImageByFeed = function () {
            feedService.getImageByFeed($scope.feed.id).then(function (results) {
                $scope.img = 0;
                $scope.list = results.data;
                ngDialog.open({
                    template: '/app/templates/dialog-view-image.html',
                    controller: 'ViewImageController',
                    scope: $scope
                });
            }, function (err) {
                alert('error');
                console.log(err);
            });
        }
    }]);