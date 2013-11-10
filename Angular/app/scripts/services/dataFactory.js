/**
 * Created by ahmed on 11/10/13.
 */


var boolParser = angular.module('data', [])

    .factory('dataFactory', function ($http) {
        return {
            getData: function (url, offset, limit) {
                return { success: function (callback) {
                    $http({
                        method: "GET",
                        url: url,
                        params: {offset: offset, limit: limit}
                    }).success(function () {
                            if (typeof callback === "function")
                                callback.apply(this, arguments);
                     })
                }
                }
            },
            saveRecord: function () {

            },
            deleteRecord: function () {

            },
            newRecord: function () {

            },
            queryRecord: function () {

            },
            aboutRecord: function () {

            }
        }
    });