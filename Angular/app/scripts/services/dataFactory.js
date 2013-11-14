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
             * get data from the server
             * @param url the url where to get the data
             * @param offset offset of the record to get
             * @param limit limit of the record to get
             * @returns {{success: Function}} success method to execute
             */
            allRecords: function () {
                var chain = new Chain();
                $http({
                    method: "GET",
                    url: config.url + "?" + config.actions.list,
                    params: {action: "list", offset: 10, limit: 10}
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
            newRecord: function (new_record) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.create,
                    data: new_record,
                    params: {action: "create"}
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            updateRecord: function (record, success, error) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.update,
                    data: record,
                    params: {action: "update"}
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },
            deleteRecord: function (record, success, error) {
                var chain = new Chain();
                $http({
                    method: "POST",
                    url: config.url + "?" + config.actions.delete,
                    data: record,
                    params: {action: "delete"}
                }).success(function () {
                        if (typeof chain.success === "function")
                            chain.success.apply(this, arguments);
                    }).error(function () {
                        if (typeof chain.error === "function")
                            chain.error.apply(this, arguments);
                    })
                return chain.r;
            },

            queryRecord: function () {

            },
            aboutRecord: function () {

            }
        }
    })
;