/**
 * Created by Bensaad on 09/11/13.
 */

var commandController=angular.module("commandController",[]);
commandController.controller("commandController",function($scope){
    /**
     * Commands
     */
    var tablescope=$scope.$parent;
    /* New Record */
    $scope.newRecord=function(){
        var record=[];
        for(var val in $scope.datas.head){
            record.push({value:""});
        }
        tablescope.new_record=record;
        tablescope.show_new_record=true;
        tablescope.selectedRecordValue=-1;
    };

    /* Cancel Record */
    $scope.cancelRecord=function(){
        tablescope.new_record=undefined;
        tablescope.show_new_record=false;
    }

    /* Save Record */
    $scope.saveRecord=function(){
        tablescope.datas.body.unshift($scope.new_record);
        tablescope.new_record=undefined;
        tablescope.show_new_record=false;
    }

    /* Copy Record */
    $scope.copyRecord=function(){
        if($scope.selectedRecordValue!==-1){
            var record=$scope.datas.body[$scope.selectedRecordValue];
            var copyOfRecord=(JSON.parse(JSON.stringify(record)));
            tablescope.datas.body.splice($scope.selectedRecordValue,0,copyOfRecord);
        }
    }

    /* Delete Record */
    $scope.deleteRecord=function(){
        var index=$scope.selectedRecordValue;
        if(index!==-1){
            if(index>0)
                tablescope.selectedRecordValue--;
            tablescope.datas.body.splice(index,1);
        }
    }

    /* Query Record */
    $scope.queryRecord=function(){
        var record=[];
        for(var val in $scope.datas.head){
            record.push({value:""});
        }
        tablescope.query_record=record;
        tablescope.show_query_record=true;
        tablescope.selectedRecordValue=-1;
    };

    /* Refine Query Record */
    $scope.refineQueryRecord=function(){
        tablescope.show_query_record=true;
        tablescope.selectedRecordValue=-1;
    };

    /* Clear Query Record */
    $scope.clearQueryRecord=function(){
        tablescope.query_record=undefined;
        tablescope.show_query_record=false;
    };

    $scope.config={
        newRecord:true
    }

});