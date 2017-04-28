app.directive('imageAlbum', function () {
    return {
        restrict: 'E',
        scope: {
            album: '=',
            iscuruser: '='
        },
        templateUrl: '/app/templates/image-album-template.html',
        controller: 'ImageAlbumController'
    };
}).controller("ImageAlbumController", ['$scope', 'ngDialog', 'imageService',
 function ($scope, ngDialog, imageService) {
     
     $scope.UpdateState = function (scoll) {
         setTimeout(function () {
             new AnimOnScroll(document.getElementById('grid'), {
                 minDuration: 0.4,
                 maxDuration: 0.6,
                 viewportFactor: 0.2
             });
             if (scoll != undefined) {
                 scoll();
             }
         }, 100);
     };
     $scope.changeActive = function (index) {
         $scope.active = $scope.albums[index];
         $scope.UpdateState(function () {
             $('html, body').animate({ scrollTop: '+=300px' }, 100);
         });
     };

      $scope.ShowFeed = function (index) {
        $scope.feed = $scope.album.images[index].feed;
            ngDialog.open({
                template: '/app/templates/feed-item-template.html',
                controller: 'FeedController',
                scope: $scope
        });
            

        
    };
    $scope.ShowImage = function(index){
            $scope.img = index;
            console.log($scope.album);
            $scope.list = $scope.album.images;
            ngDialog.open({
                template: '/app/templates/dialog-view-image.html',
                controller: 'ViewImageController',
                 scope: $scope
            });
    }
    $scope.GetMoreImage = function(){

        imageService.getMoreImageFromAlbum($scope.album.id, $scope.album.images[ $scope.album.images.length - 1].id)
            .then(function(results){
                $scope.album.images.push.apply($scope.album.images, results.data);
                $scope.UpdateState();
                
            }, function(err){
                alert('err');
            });
    };
    $scope.AddAlbum = function (album) {
        $scope.album = album;
        ngDialog.open({
            template: 'app/templates/add-image-album-template.html',
            scope: $scope,
            controller: 'AddImageAlbumController'
        });

    };
    $scope.EditNameAlbum = function () {
        $scope.newname = $scope.album.nameAlbum;
        ngDialog.open({
            controller: 'EditNameAlbumController',
            template: '/app/templates/edit-name-album-template.html',
            scope: $scope
            
        });
    };
    
 }]);