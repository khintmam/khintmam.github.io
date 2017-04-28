'use strict';
app.factory('feedService', ['$http', function ($http) {

    var serviceBase = 'https://ktmsocial.somee.com/';
    var feedServiceFactory = {};

    var _getFeed = function (username) {

        return $http.get(serviceBase + 'api/home/getfeed?username=' + username).then(function (results) {
            return results;
        });
    };
    var _likeFeed = function (feedid, username) {
        return $http.post(serviceBase + 'api/feed/likefeed?feedid=' + feedid + '&username=' + username).then(function (results) {
            return results;
        });
    };
    var _sadFeed = function (feedid, username) {
        return $http.post(serviceBase + 'api/feed/sadfeed?feedid=' + feedid + '&username=' + username).then(function (results) {
            return results;
        });
    };
    var _getFeedByID = function (id) {
        return $http.post(serviceBase + 'api/feed/getfeedbyid?id=' + id).then(function (results) {
            return results;
        });
    };
    var _getMoreFeed = function (lastid, type, username) {
        return $http.post(serviceBase + 'api/feed/getmorefeed?lastid=' + lastid + '&type=' + type + '&username=' + username)
            .then(function(results){ return results});
    };

    var _getImageByFeed = function (feedid) {
        return $http.post(serviceBase + 'api/feed/getimagesbyfeed?feedid=' + feedid).then(function (results) {
            return results;
        });
    };
    var _getFeedByUsername = function (username) {
        return $http.post(serviceBase + 'api/feed/getfeedbyusername?username=' + username).then(function (results) {
          
            return results;
        });
    };
    feedServiceFactory.getFeed = _getFeed;
    feedServiceFactory.likeFeed = _likeFeed;
    feedServiceFactory.sadFeed = _sadFeed;
    feedServiceFactory.getFeedByID = _getFeedByID;
    feedServiceFactory.getMoreFeed = _getMoreFeed;
    feedServiceFactory.getImageByFeed = _getImageByFeed;
    feedServiceFactory.getFeedByUsername = _getFeedByUsername;
    return feedServiceFactory;

}]);