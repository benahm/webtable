/**
 * Created by Bensaad on 08/11/13.
 */
var tableController=angular.module("tableController",[]);
tableController.controller("tableController",function($scope){
    $scope.message="hello,world"
    $scope.datas={
        info:{
            pgNum:6,
            pgTotal:7
        },
        head:["name","age","gender"],
        body:[
            [{value:'John'},{value:25}, {value:'boy'}],
            [{value:'Jessie'},{value: 30}, {value:'girl'}],
            [{value:'Johanna'},{value: 28}, {value:'girl'}],
            [{value:'Joy'}, {value:15}, {value:'girl'}],
            [{value:'Mary'}, {value:28}, {value:'girl'}],
            [{value:'Peter'},{value: 95}, {value:'boy'}],
            [{value:'Sebastian'},{value: 50}, {value:'boy'}],
            [{value:'Erika'}, {value:27}, {value:'girl'}],
            [{value:'Patrick'},{value: 40}, {value:'boy'}],
            [{value:'Samantha'},{value: 60},{value: 'girl'}]
        ]}

    /**
     * Sort and selection
     *
     */
    $scope.activeRecord=function(index){
        if( $scope.selectedRecordValue===index)
            return "active"
        return "";
    }
    $scope.setSelectedRecord=function(index){
        $scope.selectedRecordValue=index;
    }

    $scope.selectedRecord=function(index){
        if(index===undefined)return false;
        return ($scope.selectedRecordValue===index);
    };

    $scope.sort=function(headElement){
        $scope.datas.body.pop();
    };

    $scope.columnNum=-1;
    $scope.reverseSort=false;
    $scope.setSelectedColumn=function(i){
        if($scope.columnNum===i)
            $scope.reverseSort=!$scope.reverseSort;
        else{
            $scope.columnNum=i;
            $scope.reverseSort=false;
        }
    };

    $scope.selectedColumn=function(data){
        if($scope.columnNum>=0)
            return data[$scope.columnNum].value;
        else return $scope.datas.body.indexOf(data);
    };

    /**
     * Pages
     */

    $scope.pageRange=function(){
        var lowerBound,upperBound;
        if($scope.datas.info.pgNum>3){

        }
    }

    $scope.makeArray = function(num) {
        return new Array(num);
    }

    $scope.decalePage=($scope.datas.info.pgNum-3)<0?0:($scope.datas.info.pgNum-3);

});