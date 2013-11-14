/**
 * Created by ahmed on 11/10/13.
 */

/**
 * Data management
 */
angular.module('data', ["configuration"])
/**
 * dataFactory manage data from the server
 */
    .factory('dataFactory', function ($http) {
        return {
            /**
             * get data from the server
             * @param url the url where to get the data
             * @param offset offset of the record to get
             * @param limit limit of the record to get
             * @returns {{success: Function}} success method to execute
             */
            getData: function (url, offset, limit) {
                return {
                    success: function (callback) {
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