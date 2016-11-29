'use strict';
app.factory('commentService', ['$http', function ($http) {

    var serviceBase = 'http://ktmsocialapi.somee.com/';
    var CommentServiceFactory = {};

    var _addComment = function (feedid, content, username) {

        //return $http.get(serviceBase + 'api/comment/addcomment?content=' + content + '&feedid=' + feedid + '&username=' + username).then(function (results) {
        //    return results;
        //});

        return $http({
            method: 'post',
            data: { content: content, feedid: feedid, username: username },
            url: serviceBase + 'api/comment/addcomment'
        }).then(function (results){
            return results;
        }, function (error, status) {
            console.log(error);
            console.log(status);
        });
    };


    var _GetMoreComment = function (feedid, curnumber) {
        return $http({
            method: 'post',
            data: { feedid: feedid, curnumber: curnumber },
            url: serviceBase + 'api/comment/getmorecomment'
        }).then(function (results) {
            return results;
        }, function (error, status) {
            console.log(error);
            console.log(status);
        });
    };

    var _GetAllComment = function (feedid) {
        return $http.post(serviceBase + 'api/comment/getallcomment?feedid=' + feedid).then(function (results) {
            return results;
        });
    };

    var _UpdateComment = function (comment) {
        return $http.post(serviceBase + 'api/comment/updatecomment', comment).then(function (results){
            return results;
        });
    };
    CommentServiceFactory.addComment = _addComment;
    CommentServiceFactory.getMoreComment = _GetMoreComment;
    CommentServiceFactory.updateComment = _UpdateComment;
    CommentServiceFactory.getAllComment = _GetAllComment;
    return CommentServiceFactory;

}]);