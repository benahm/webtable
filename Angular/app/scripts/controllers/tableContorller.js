/**
 * Created by Bensaad on 08/11/13.
 */
var tableController=angular.module("tableController",[]);
tableController.controller("tableController",function($scope){
    $scope.message="hello,world"
    $scope.datas={
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
    $scope.focus=function(){

    };

    /* New Record */
    $scope.newRecord=function(){
        var record=[];
        for(var val in $scope.datas.head){
            record.push({value:""});
        }
        $scope.new_record=record;
        $scope.show_new_record=true;
        $scope.selectedRecordValue=-1;
    };

    /* Cancel Record */
    $scope.cancelRecord=function(){
        $scope.new_record=undefined;
        $scope.show_new_record=false;
    }

    /* Save Record */
    $scope.saveRecord=function(){
        $scope.datas.body.unshift($scope.new_record);
        $scope.new_record=undefined;
        $scope.show_new_record=false;
    }

    /* Copy Record */
    $scope.copyRecord=function(){
        if($scope.selectedRecordValue!==-1){
            var record=$scope.datas.body[$scope.selectedRecordValue];
            var copyOfRecord=(JSON.parse(JSON.stringify(record)));
            $scope.datas.body.splice($scope.selectedRecordValue,0,copyOfRecord);
        }
    }

    /* Delete Record */
    $scope.deleteRecord=function(){
        if($scope.selectedRecordValue!==-1)
            $scope.datas.body.splice($scope.selectedRecordValue,1);
    }

    /* Query Record */
    $scope.queryRecord=function(){
        var record=[];
        for(var val in $scope.datas.head){
            record.push({value:""});
        }
        $scope.query_record=record;
        $scope.show_query_record=true;
        $scope.selectedRecordValue=-1;
    };

    /* Refine Query Record */
    $scope.refineQueryRecord=function(){
        $scope.show_query_record=true;
        $scope.selectedRecordValue=-1;
    };

    /* Clear Query Record */
    $scope.clearQueryRecord=function(){
        $scope.query_record=undefined;
        $scope.show_query_record=false;
    };

    $scope.selectedRecord=function(index){
        if(index===undefined)return false;
        return ($scope.selectedRecordValue===index);
    };

    $scope.sort=function(headElement){
        console.log("hi")
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
        else return 0;
    };

});