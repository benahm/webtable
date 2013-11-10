/**
 * Created by Bensaad on 08/11/13.
 */

var directivesModule = angular.module("directivesModule", ["tableController"]);
directivesModule.directive('doFocus',function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            var tablescope = $("#webtable").scope();

            scope.cellChanged=function(){
                tablescope.datas.body[tablescope.selectedRecordValue].changed=true;
                tablescope.$apply();
            }
            scope.$watch(attrs.doFocus, function (value) {
                if (value === true) {
                    element[0].focus();
                    //scope.query_record.focused=true;
                    $timeout(function () {

                        if (!scope.nq) {
                            tablescope.show_query_record = false;
                        }
                        if (scope.outerindex != undefined) {
                            tablescope.selectedRecordValue = scope.outerindex;
                        }
                        console.log("hoooo")
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
}).directive("ngCell",function () {
    }).directive('ngClickOutside',function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr, ctrl) {
                $(elem).blur(function () {
                    scope.$apply(attr.ngClickOutside);
                })
            }
        }
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
    }).directive('webtableCellNq', function () {
        return {
            restrict: 'AE',
            templateUrl: 'webtable-cell-nq.html',
            scope: {
                d: "=datacell",
                index: "=",
                nq: "@"
            },
            replace: true
        };
    });