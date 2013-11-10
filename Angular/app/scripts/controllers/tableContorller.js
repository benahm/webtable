/**
 * Created by Ahmed on 08/11/13.
 */

/**
 * Table management
 */
angular.module("tableController", ["data"])
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
        $scope.activeRecord = function (index) {
            if ($scope.selectedRecordValue === index)
                return "active"
            return "";
        }
        $scope.setSelectedRecord = function (index) {
            $scope.selectedRecordValue = index;
        }

        $scope.selectedRecord = function (index) {
            if (index === undefined)return false;
            return ($scope.selectedRecordValue === index);
        };

        $scope.columnNum = -1;
        $scope.reverseSort = false;
        $scope.setSelectedColumn = function (i) {
            if ($scope.columnNum === i)
                $scope.reverseSort = !$scope.reverseSort;
            else {
                $scope.columnNum = i;
                $scope.reverseSort = false;
            }
        };

        $scope.selectedColumn = function (data) {
            if ($scope.columnNum >= 0)
                return data[$scope.columnNum];
            else return $scope.datas.body.indexOf(data);
        };

        /**
         * Pages
         */

        $scope.pageRange = function () {
            var lowerBound, upperBound;
            if ($scope.datas.info.pgNum > 3) {

            }
        }

        $scope.makeArray = function (num) {
            return new Array(num);
        }

        //$scope.decalePage=($scope.datas.info.pgNum-3)<0?0:($scope.datas.info.pgNum-3);

    });