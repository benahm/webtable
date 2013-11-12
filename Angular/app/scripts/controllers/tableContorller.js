/**
 * Created by Ahmed on 08/11/13.
 */

/**
 * Table management
 */
angular.module("tableController", ["data", "configuration"])
    .controller("tableController", function ($scope, $http, dataFactory) {
        $scope.message = "hello,world"
        $scope.datas = {};

        //get the data from the server
        dataFactory.getData("../json/test.json").success(function (data) {
            $scope.datas = data;
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


        $scope.makeArray = function (num) {
            return new Array(num);
        }

        /* apply changes */

        $scope.cellChanged=function(d,i,j){
            $scope.datas.body[i][j]=d;
        }

        $scope.queryCellChanged=function(d,i){
            $scope.query_record[i]=d;
        }

        $scope.newCellChanged=function(d,i){
            $scope.new_record[i]=d;
        }
    });