/**
 * Created by ahmed on 11/11/13.
 */
/**
 * page management
 */
angular.module("pageController", ["data","configuration"])
    .controller("pageController", function ($scope,dataFactory) {
        //TODO to implement
        console.log(API_END_POINT);
        /**
         * display the next page on the table
         */
        this.next=function(){
            console.log("hello")
            //get the data from the server
            dataFactory.getData("../json/test2.json").success(function (data) {
                $scope.$parent.datas = data;
                console.log("hello")
            })
        };

        /**
         * display a specific page
         * @param index of the page to display
         */
        this.goto=function(index){
            //get the data from the server
            dataFactory.getData("../json/test.json").success(function (data) {
                $scope.$parent.datas = data;
            })
        };

        /**
         * display the previous page on the table
         */
        this.previous=function(){
            //get the data from the server
            dataFactory.getData("../json/test.json").success(function (data) {
                $scope.$parent.datas = data;
            })
        };

        this.from=1

        this.to=7
    });