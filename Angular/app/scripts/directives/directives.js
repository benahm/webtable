/**
 * Created by Bensaad on 08/11/13.
 */

var directivesModule=angular.module("directivesModule",[]);
directivesModule.directive('doFocus', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.doFocus, function(value) {
                if(value === true) {
                    element[0].focus();
                    //scope.query_record.focused=true;
                    console.log("query",$("#webtable").scope().show_query_record)

                    if(!scope.show_query_record){
                        $("#webtable").scope().show_query_record=false;
                    }
                    if(scope.outerindex!=undefined){
                        $("#webtable").scope().selectedRecordValue=scope.outerindex;
                    }
                    if(!scope.new_record){
                        var tablescope=$("#webtable").scope();
                        if(tablescope.new_record){
                            tablescope.datas.body.unshift(tablescope.new_record);
                            tablescope.new_record=undefined;
                        }
                    }
                }
            });
        }
    };
}).filter('queryRecord', function() {
        return function(row,query_record) {
            if(!query_record)return row;
            var i;
            for(i=0;i<row.length; i++){
                if((row[i].value+"").toLowerCase().indexOf(query_record[i].value.toLowerCase())==-1) break;
            }
            if(i==row.length)
                return row;
        }
    }).directive("ngCell",function(){

    }).directive('ngClickOutside', function($document){
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {
                $(elem).blur(function(){
                    scope.$apply(attr.ngClickOutside);
                })
            }
        }
    }).directive('webtableCell', function() {
    return {
        restrict: 'AE',
        templateUrl: 'webtable-cell.html',
        scope:{
            d:"=datacell",
            innerindex:"=",
            outerindex:"=",
            maxouterindex:"="
        },
        replace: true
    };
});