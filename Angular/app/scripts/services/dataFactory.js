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
    .factory('dataFactory', function ($http, config) {

        function Chain() {
            var _this = this;
            this.success = undefined;
            this.error = undefined;
            this.r = { success: function (callback) {
                _this.success = callback;
                return _this.r;
            },
                error: function (callback) {
                    _this.error = callback;
                    return _this.r;
                }}

        }

        return {
            /**
             * get all records from the server
             * @returns {{success: Function}} success method to execute
             */
            allRecords: function () {
                var chain = new Chain();
                $http({
                    method: "GET",
                    url: config.url + "?" + config.actions.list,
                    params: {offset: 10, limit: 10}
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    })
                    .error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            /**
             * save a new record to the server
             * @param new_record
             * @returns {{success: Function, error: Function}|*}
             */
            newRecord: function (new_record) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.create,
                    data: new_record,
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            /**
             * update record to the server
             * @param record : record to update
             * @returns {{success: Function, error: Function}|*}
             */
            updateRecord: function (record) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.update,
                    data: record
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            /**
             * delete record from the server
             * @param record : record to delete
             * @returns {{success: Function, error: Function}|*}
             */
            deleteRecord: function (record) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.delete,
                    data: record
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            /**
             * query record from the server
             * @param query_record
             * @returns {{success: Function, error: Function}|*}
             */
            queryRecord: function (query_record) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.query,
                    data: query_record
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            aboutRecord: function (record) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.about,
                    data: record,
                    params: {action: "about"}
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            }
        }
    })
;