/**
 * Created by ahmed on 11/11/13.
 */
/**
 * page management
 */
angular.module("pageController", [])
    .controller("pageController", function ($scope, $http, dataFactory) {

        /**
         * display the next page on the table
         */
        $scope.nextPage=function(){
            //get the data from the server
            dataFactory.getData("../json/test.json").success(function (data) {
                $scope.datas = data;
            })
        };

        /**
         * display a specific page
         * @param index of the page to display
         */
        $scope.gotoPage=function(index){
            //get the data from the server
            dataFactory.getData("../json/test.json").success(function (data) {
                $scope.datas = data;
            })
        };

        /**
         * display the previous page on the table
         */
        $scope.previousPage=function(){
            //get the data from the server
            dataFactory.getData("../json/test.json").success(function (data) {
                $scope.datas = data;
            })
        };

    });