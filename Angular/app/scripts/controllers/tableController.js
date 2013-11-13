/**
 * Created by Ahmed on 08/11/13.
 */

/**
 * Table management
 */
angular.module("tableController", ["data", "configuration"])
    .controller("tableController", function ($scope, $http, dataFactory, config) {
        $scope.message = "hello,world"
        $scope.datas = {};


        //get the data from the server
        dataFactory.getData("../json/test.json").success(function (data) {
            $scope.datas = data;
            for (var i = 0; i < config.fields.length; i++)
                config.fields[i].columnWidth = 98 / config.fields.length;
        })

        /**
         * Sort and selection
         *
         */
        $scope.selectedRecordValue = -1;
        /**
         * return 'active' if the index of the record is active
         * @param index : index of the record which to check if it's active
         * @returns {string} 'active' or empty string
         */
        $scope.activeRecord = function (index) {
            if ($scope.selectedRecordValue === index)
                return "active"
            return "";
        }

        /**
         * set the index of the selected record to a variable
         * @param index : index of the selected record
         */
        $scope.setSelectedRecord = function (index) {
            $scope.selectedRecordValue = index;
        }

        /**
         * check if the record is selected
         * @param index : index of the record
         * @returns {boolean}
         */
        $scope.isSelectedRecord = function (index) {
            if (index === undefined)return false;
            return ($scope.selectedRecordValue === index);
        };

        $scope.columnNum = -1;
        $scope.reverseSort = false;

        /**
         * set the selected column
         * @param index : index of the selected column
         */
        $scope.setSelectedColumn = function (index) {
            if ($scope.columnNum === index)
                $scope.reverseSort = !$scope.reverseSort;
            else {
                $scope.columnNum = index;
                $scope.reverseSort = false;
            }
        };

        /**
         * return the value in selected column and the record giving in params
         * @param record : record where to get the value
         * @returns {*} value
         */
        $scope.selectedColumn = function (record) {
            if ($scope.columnNum >= 0)
                return record[$scope.columnNum];
            //if no column selected return the indexOf
            return $scope.datas.body.indexOf(record);
        };

        $scope.columnWidth = function (index) {
            return config.fields[index].columnWidth;
        };

        $scope.makeArray = function (num) {
            return new Array(num);
        };

        $scope.webtableStyle = function () {
            var webtable_border = angular.element('#webtable-border');
            var columnWidth = 98 / config.fields.length;
            console.log(columnWidth)
            if (columnWidth < config.minColumnWidth) {
                return {
                    width: config.minColumnWidth * config.fields.length * webtable_border.width()
                }
            }
            return {
                width: 100
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
                left: percent * webtableWidth / 100
            })
        };

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
            var minColumnWidth = config.minColumnWidth;
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

    });