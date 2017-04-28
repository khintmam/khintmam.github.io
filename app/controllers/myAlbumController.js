app.controller("MyAlbumController", ['$scope', 'imageService', 'authService', 'ngDialog',
 function($scope, imageService, authService, ngDialog){
    $scope.auth = authService.authentication;
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
   
    imageService.getAlbumByUser($scope.auth.userName).then(function(results){
        $scope.listAlbum = results.data;

        $scope.activeAlbum = $scope.listAlbum[0];
        $scope.UpdateState();
       

    },  function(err){
        alert(err);
        console.log(err);
    });
    
   



    
}]);