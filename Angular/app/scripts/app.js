/**
 * Created by Bensaad on 07/11/13.
 */

var myModule=angular.module("myModule",["directivesModule"]);

myModule.controller("TableController",function($scope){
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

    $scope.newRecord=function(){
        var record=[];
        for(var val in $scope.datas.head){
            record.push({value:""});
        }
        $scope.new_record=record;
        $scope.show_new_record=true;
        $scope.selectedRecordValue=-1;
    };

    $scope.cancelRecord=function(){
        $scope.new_record=undefined;
        $scope.show_new_record=false;
    }

    $scope.saveRecord=function(){
        $scope.datas.body.unshift($scope.new_record);
        $scope.new_record=undefined;
        $scope.show_new_record=false;
    }

    $scope.queryRecord=function(){
        var record=[];
        for(var val in $scope.datas.head){
            record.push({value:""});
        }
        $scope.query_record=record;
        $scope.show_query_record=true;
        $scope.selectedRecordValue=-1;
    };

    $scope.clearQueryRecord=function(){
        $scope.query_record=undefined;
        $scope.show_query_record=false;
    };

    $scope.selectedRecord=function(index){
        console.log($scope.selectedRecordValue,index)
            if(index===undefined)return false;
            return ($scope.selectedRecordValue===index);
    };
    $scope.unfocused=function(){
        var b=false;
        for(var i=0;i< $scope.query_record.length;i++){
            b=b || $scope.query_record[i].focused;
        }
        if(b==undefined)b=false;
        return b;
    };

});