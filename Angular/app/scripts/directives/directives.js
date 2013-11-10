/**
 * Created by Ahmed on 08/11/13.
 */

/**
 * directives of the project
 * @type {*}
 */
var directivesModule = angular.module("directivesModule", ["tableController"]);
directivesModule.directive('doFocus',function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            // watch the value focused on the attrs.doFocus
            scope.$watch(attrs.doFocus, function (value) {
                if (value === true) {
                    element[0].focus(); // focus on the element

                    $timeout(function () {
                        var tablescope = $("#webtable").scope();
                        if (!scope.nq) {
                            tablescope.show_query_record = false;
                        }
                        if (scope.outerindex != undefined) {
                            tablescope.selectedRecordValue = scope.outerindex;
                        }
                        if (!scope.nq) {
                            if (tablescope.new_record) {
                                /*tablescope.datas.body.unshift(tablescope.new_record);
                                 tablescope.new_record = undefined;
                                 tablescope.show_new_record = false;*/

                            }
                        }
                    });
                }
            });
        }
    };
}).directive('webtableCell',function () {
        return {
            restrict: 'AE',
            templateUrl: 'webtable-cell.html',
            scope: {
                d: "=datacell",
                innerindex: "=",
                outerindex: "=",
                maxouterindex: "="
            },
            replace: true
        };
    }).directive('webtableCellNq', function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'webtable-cell-nq.html',
            scope: {
                d: "=datacell",
                index: "=",
                nq: "@"
            },
            replace: true,
            link:function(scope, element, attrs){
                scope.cellChanged=function(){
                    var tablescope = $("#webtable").scope();
                    $timeout(function () {
                        if(attrs.nq=="new_record")
                            tablescope.new_record[scope.index]=scope.d;
                        if(attrs.nq=="query_record")
                            tablescope.query_record[scope.index]=scope.d;
                        tablescope.$apply();
                    });
                }
            }
        };
    });