/**
 * Created by Ahmed on 08/11/13.
 */

/**
 * Table management
 */
angular.module("tableController", ["data", "configuration", "utils"])
    .controller("tableController", function ($scope, $http, $rootScope, dataFactory, config, utilsFactory) {
        $scope.message = "hello,world"

        //utils factory
        $scope.utils = utilsFactory;
        //config
        $scope.config = config;

        //get the data from the server
        dataFactory.allRecords().success(function (data) {
            console.log(data)
            $scope.records = data.records;
            for (var i = 0; i < config.fields.length; i++)
                config.fields[i].columnWidth = 98 / config.fields.length;
        })

         /*** record selection ***/

        $scope.indexSelectedRecord = -1;
        $scope.recordChanged = false;
        /**
         * return 'active' if the index of the record is active
         * @param index : index of the record which to check if it's active
         * @returns {string} 'active' or empty string
         */
        $scope.activeRecord = function (index) {
            if ($scope.indexSelectedRecord === index)
                return "active"
            return "";
        }

        /**
         * set the index of the selected record to a variable
         * @param index : index of the selected record
         */
        $scope.setSelectedRecord = function (index) {
            var lastIndex = $scope.indexSelectedRecord;
            if (lastIndex != index) {
                // if a record was selected and changed
                if (lastIndex != -1 && $scope.recordChanged) {
                    var record = $scope.records[lastIndex];
                    // send the updated record to the server
                    dataFactory.updateRecord(record)
                        .success(function (data) {
                            console.log("success")
                            $scope.indexSelectedRecord = index;
                            $scope.recordChanged = false;
                            console.log("set sr", $scope.recordChanged)
                        })
                        .error(function (data) {
                            console.log("error")
                        });
                } else
                    $scope.indexSelectedRecord = index;
            }
        }

        /**
         * check if the record is selected
         * @param index : index of the record
         * @returns {boolean}
         */
        $scope.isSelectedRecord = function (index) {
            if (index === undefined) return false;
            return ($scope.indexSelectedRecord === index);
        };

         /*** record sorting  **/

        $scope.indexSelectedColumn = -1;
        $scope.reverseSort = false;

        /**
         * set the selected column
         * @param index : index of the selected column
         */
        $scope.setSelectedColumn = function (index) {
            if ($scope.indexSelectedColumn === index)
                $scope.reverseSort = !$scope.reverseSort;
            else {
                $scope.indexSelectedColumn = index;
                $scope.reverseSort = false;
            }
        };

        /**
         * return the value in selected column and the record giving in params
         * @param record : record where to get the value
         * @returns {*} value
         */
        $scope.selectedColumn = function (record) {
            if ($scope.indexSelectedColumn >= 0)
                return record[$scope.indexSelectedColumn];
            //if no column selected return the indexOf
            return $scope.records.indexOf(record);
        };


         /*** column resize ***/

        $scope.columnWidth = function (index) {
            return config.fields[index].columnWidth;
        };

        /**
         * ajust width of the webtable
         * @returns {*}
         */
        $scope.webtableStyle = function () {
            var webtable_border = angular.element('#webtable-border'),
                columnWidth = 98 / config.fields.length;
            if (columnWidth < utilsFactory.pxToPercent(config.minColumnWidth, webtable_border.width())) {
                return {
                    // if column width is less than the minimum column with
                    width: config.fields.length * config.minColumnWidth + "px"
                }
            }
            return {
                width: webtable_border.width() // fit the webtable border
            }
        }

        $scope.thWidth = function (index) {
            return {width: config.fields[index].columnWidth + '%'}
        };

        $scope.hookLeft = function (index) {
            var percent = 2;
            for (var i = 0; i < index; i++)
                percent += config.fields[i].columnWidth;
            return {left: percent + '%'}
        };

        $scope.normalize = function (index) {
            var percent = 2;
            for (var i = 0; i < index; i++)
                percent += config.fields[i].columnWidth;
            var webtableWidth = angular.element("#webtable").width();
            angular.element("#hook-" + index).css({
                left: utilsFactory.percentToPx(percent, webtableWidth)
            })
        };

        /**
         * on column resize
         */
        $scope.$on("colResize", function (event, index, move) {
            // apply the move to columns width
            config.fields[index].columnWidth -= move;
            config.fields[index - 1].columnWidth += move;
            checkMinColumnWidth(index);

            //apply the width on the column index directly with css
            angular.element("#head-" + index).css({
                width: config.fields[index].columnWidth + '%'
            })
            //apply the width on the column index-1 directly with css
            angular.element("#head-" + (index - 1)).css({
                width: config.fields[index - 1].columnWidth + '%'
            })

            //?????
            $scope.normalize(index);

        })

        /**
         * checkMinColumnWidth ensure a min column width
         * @param index : index of the resize column
         */
        function checkMinColumnWidth(index) {
            var webtableWidth = angular.element("#webtable").width()
            var minColumnWidth = utilsFactory.pxToPercent(config.minColumnWidth, webtableWidth);
            var diff = config.fields[index].columnWidth - minColumnWidth
            if (diff < 0) {
                config.fields[index].columnWidth = minColumnWidth;
                config.fields[index - 1].columnWidth += diff;
            }
            diff = config.fields[index - 1].columnWidth - minColumnWidth
            if (diff < 0) {
                config.fields[index - 1].columnWidth = minColumnWidth;
                config.fields[index].columnWidth += diff;
            }
        }

        $scope.$on("recordChanged", function () {
            $scope.recordChanged = true;
        })


    });