/**
 * Created by ahmed on 11/11/13.
 */
/**
 * loading data management
 */
angular.module("loadController", ["data","configuration"])
    .controller("loadController", function ($scope,dataFactory,config) {
        //TODO to implement
        /**
         * display the next page on the table
         */
        this.next=function(){
            //get the data from the server
            dataFactory.getData("../json/test2.json").success(function (data) {
                $scope.$parent.records = data.records;
            })
        };

        /**
         * display a specific page
         * @param index of the page to display
         */
        this.goto=function(index){
            this.active=index+1;
            //get the data from the server
//            dataFactory.getData("../json/test.json").success(function (data) {
//                $scope.$parent = data;
//            })
        };

        /**
         * display the previous page on the table
         */
        this.previous=function(){

            //get the data from the server
            dataFactory.getData("../json/test.json").success(function (data) {
                $scope.$parent.records = data.records;
            })
        };

        /**
         * from which page to display of number of pages
         * @type {number}
         */
        this.from=1

        /**
         * until which page to display the number of pages
         * @type {number}
         */
        this.to=5

        /**
         * the active page
         * @type {number}
         */
        this.active=3;
    });