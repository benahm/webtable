/**
 * Created by Ahmed on 09/11/13.
 */

/**
 * commands management
 */
angular.module("commandController", ["constraint"])
    .controller("commandController", function ($scope, constraintFactory) {
        /**
         * Commands
         */
        var tablescope = $scope.$parent;// get scope of tableController

        /* New Record */
        $scope.newRecord = function () {
            var record = [];
            for (var val in $scope.datas.head) {
                record.push("");
            }
            tablescope.new_record = record;
            tablescope.show_new_record = true;
            tablescope.selectedRecordValue = -1;
        };

        /* Cancel Record */
        $scope.cancelRecord = function () {
            tablescope.new_record = undefined;
            tablescope.show_new_record = false;
        }

        /* Save Record */
        $scope.saveRecord = function () {
            var check = constraintFactory.checkAll($scope.new_record, $scope.datas.head)
            if (!check) {
                tablescope.datas.body.unshift($scope.new_record);
                tablescope.new_record = undefined;
                tablescope.show_new_record = false;
            } else $scope.modal.displayMessages(check);
        }

        /* Copy Record */
        $scope.copyRecord = function () {
            console.log($scope.selectedRecordValue)
            if ($scope.selectedRecordValue !== -1) {
                var record = $scope.datas.body[$scope.selectedRecordValue];
                var copyOfRecord = (JSON.parse(JSON.stringify(record)));
                tablescope.datas.body.splice($scope.selectedRecordValue, 0, copyOfRecord);
            } else $scope.modal.display("No record selected!");
        }

        /* Delete Record */
        $scope.deleteRecord = function () {
            var index = $scope.selectedRecordValue;
            if (index !== -1) {
                if (index > 0)
                    tablescope.selectedRecordValue--;
                tablescope.datas.body.splice(index, 1);
            } else $scope.modal.display("No record selected!");
        }

        /* Query Record */
        $scope.queryRecord = function () {
            var record = [];
            for (var val in $scope.datas.head) {
                record.push("");
            }
            tablescope.query_record = record;
            tablescope.show_query_record = true;
            tablescope.selectedRecordValue = -1;
        };

        /* Refine Query Record */
        $scope.refineQueryRecord = function () {
            tablescope.show_query_record = true;
            tablescope.selectedRecordValue = -1;
        };
        /* Execute Query Record */
        $scope.executeQueryRecord = function () {
            tablescope.show_query_record = false;
        };

        /* Clear Query Record */
        $scope.clearQueryRecord = function () {
            tablescope.query_record = undefined;
            tablescope.show_query_record = false;
        };

        /* About Record */
        $scope.aboutRecord = function () {
            var index = $scope.selectedRecordValue;
            if (index != -1) {
                var changed = false // TODO
                $scope.modal.display(changed ? "The record has been modified." : "The record has not been modified yet.");
            } else $scope.modal.display("No record selected!");
        }

        /* Count Records */
        $scope.countRecords = function () {
            var count = $scope.datas.body.length;
            $scope.modal.display("Total: " + count + " records.");
        }

        //TODO config commands
        var config = $scope.config = {
            newRecord: true,
            cancelRecord: true
        }

        // managing commands display //
        $scope.commands = {
            newRecord: function () {
                return $scope.show_query_record || $scope.show_new_record
            },
            cancelRecord: function () {
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


        /* modal management */
        $scope.modal = {
            isVisible: "hide",
            message: "",
            /**
             * display a message
             * @param message to display
             * @param callback callback to execute on click on the button OK
             */
            display: function (message, callback) {
                $scope.modal.message = message;
                $scope.modal.isVisible = "show";
                if (typeof callback === "function")
                    $scope.modal.ok = callback;
            },
            /**
             * display messages return from constraints check
             * @param data data to display
             * @param callback callback to execute on click on the button OK
             */
            displayMessages: function (data, callback) {
                $scope.modal.data = {
                    nameColumn: $scope.datas.head[data.index].name,
                    messages: data.messages
                }
                $scope.modal.isVisible = "show";
                if (typeof callback === "function")
                    $scope.modal.ok = callback;
            },
            /**
             * close the modal
             */
            close: function () {
                $scope.modal.isVisible = "hide";
                $scope.modal.data=undefined;
                $scope.message=undefined;
            },
            /**
             * default action when click on OK (close the modal)
             */
            ok: function () {
                $scope.modal.isVisible = "hide";
                $scope.modal.data=undefined;
                $scope.message=undefined;
            }
        }


    });