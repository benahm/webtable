/**
 * Created by Ahmed on 09/11/13.
 */

/**
 * commands management
 */
angular.module("commandController", ["constraint", "configuration", "data"])
    .controller("commandController", function ($scope, $rootScope, constraintFactory, dataFactory, config) {
        /**
         * Commands
         */
        var tablescope = $scope.$parent;// get scope of tableController

        /* New Record */
        $scope.newRecord = function () {
            var record = [];
            for (var val in config.fields) {
                record.push("");
            }
            tablescope.new_record = record;
            tablescope.show_new_record = true;
            tablescope.selectedRecordValue = -1;
        };

        /* undo Record */
        $scope.undoRecord = function () {
            tablescope.new_record = undefined;
            tablescope.show_new_record = false;
        }

        /* Save Record */
        $scope.saveRecord = function () {
            var check = constraintFactory.checkAll($scope.new_record, config.fields)
            if (!check) {
                dataFactory.newRecord($scope.new_record)
                    .success(function (data) {
                        tablescope.records.unshift($scope.new_record);
                        tablescope.new_record = undefined;
                        tablescope.show_new_record = false;
                        tablescope.setSelectedRecord(0);
                        console.log("success")
                    })
                    .error(function(){
                       console.log("error")
                    })
            } else $rootScope.$broadcast("errors", check);
        }

        /* Copy Record */
        $scope.copyRecord = function () {
            if ($scope.indexSelectedRecord !== -1) {
                var record = $scope.records[$scope.indexSelectedRecord];
                var copyOfRecord = angular.copy(record);
                tablescope.records.splice($scope.indexSelectedRecord, 0, copyOfRecord);
            } else $rootScope.$broadcast("error", "No record selected!");//display error
        }

        /* Delete Record */
        $scope.deleteRecord = function () {
            var index = $scope.indexSelectedRecord;
            if (index !== -1) {
                var record = $scope.records[index];
                dataFactory.deleteRecord(record)
                    .success(function (data) {
                        if (index > 0)
                            tablescope.setSelectedRecord(tablescope.indexSelectedRecord-1);
                        tablescope.records.splice(index, 1);
                    })
                    .error(function (data) {

                    });
            } else $rootScope.$broadcast("error", "No record selected!");//display error
        }

        /* Query Record */
        $scope.queryRecord = function () {
            var record = [];
            for (var val in config.fields) {
                record.push("");
            }

            tablescope.query_record = record;
            tablescope.show_query_record = true;
            tablescope.setSelectedRecord(-1);
        };

        /* Refine Query Record */
        $scope.refineQueryRecord = function () {
            tablescope.query_record=$scope.last_query_record;
            tablescope.show_query_record = true;
            tablescope.setSelectedRecord(-1);
        };
        /* Execute Query Record */
        $scope.executeQueryRecord = function () {
            tablescope.last_query_record=$scope.query_record;
            // execute query here
            dataFactory.queryRecord($scope.query_record)
                .success(function(data){
                    console.log("success");
                })
                .error(function(data){
                    console.log("error");
                })
            tablescope.query_record = undefined;
            tablescope.show_query_record = false;
        };

        /* Clear Query Record */
        $scope.clearQueryRecord = function () {
            tablescope.query_record = undefined;
            tablescope.show_query_record = false;
        };

        /* About Record */
        $scope.aboutRecord = function () {
                var index = $scope.indexSelectedRecord;
            if (index != -1) {
                var changed = false // TODO
                $rootScope.$broadcast("inform", changed ? "The record has been modified." : "The record has not been modified yet.");
            } else $rootScope.$broadcast("warning", "No record selected!");// display warning
        }

        /* Count Records */
        $scope.countRecords = function () {
            var count = $scope.info.countRecords;
            $rootScope.$broadcast("inform", "Total: " + count + " records.");// display info
        }


        // managing commands display //
        $scope.commands = {
            newRecord: function () {
                return $scope.show_query_record || $scope.show_new_record
            },
            undoRecord: function () {
                return !$scope.show_new_record
            },
            saveRecord: function () {
                return !$scope.show_new_record
            },
            deleteRecord: function () {
                return $scope.show_query_record || $scope.show_new_record
            },
            queryRecord: function () {
                return $scope.show_query_record || $scope.show_new_record
            },
            executeQueryRecord: function () {
                return !$scope.show_query_record
            },
            clearQueryRecord: function () {
                return !$scope.query_record
            }
        }


    });