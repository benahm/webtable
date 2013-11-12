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
            element.on("change",function(){
               console.log("changed");
            });
            // watch the value focused on the attrs.doFocus
            scope.$watch(attrs.doFocus, function (value) {
                console.log(scope)
                if (value === true) {
                    element[0].focus(); // focus on the element

                    $timeout(function () {
                        var tablescope = $("#webtable").scope();
                        console.log(scope.query_record, scope.new_record)
                        if (!scope.query_record) {
                            tablescope.show_query_record = false;
                        }
                        if (scope.outerindex != undefined) {
                            tablescope.selectedRecordValue = scope.outerindex;
                        }
                        if (tablescope.new_record) {
                            /*tablescope.datas.body.unshift(tablescope.new_record);
                             tablescope.new_record = undefined;
                             tablescope.show_new_record = false;*/

                        }
                    });
                }
            });
        }
    };
}).directive('webtableCell',function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable-cell.html',
            replace: true,
            scope:true
        };
    }).directive('webtableCellNew',function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable-cell-new.html',
            replace: true,
            scope:true
        };
    }).directive('webtableCellQuery',function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable-cell-query.html',
            replace: true,
            scope:true
        };
    }).directive("webtable",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable.html'
        }
    }).directive("inputText", function () {
        return {
            restrict: 'AE',
            scope: {
                focused: "=",
                index: "@",
                d: "="
            },
            templateUrl: 'templates/inputs/input-text.html',
            replace: true
        }
    });