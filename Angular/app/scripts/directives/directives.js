/**
 * Created by Ahmed on 08/11/13.
 */

/**
 * directives of the project
 * @type {*}
 */
var directivesModule = angular.module("directivesModule", ["configuration"]);
directivesModule.directive('doFocus', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            element.on("change", function () {
            });
            // watch the value focused on the attrs.doFocus
            scope.$watch(attrs.doFocus, function (value) {
                if (value === true) {
                    element[0].focus(); // focus on the element

                    $timeout(function () {
                        var tablescope = $("#webtable").scope();
                        if (!scope.query_record) {
                            tablescope.show_query_record = false;
                        }
                        if (scope.outerindex != undefined) {
                            tablescope.selectedRecordValue = scope.outerindex;
                        }
                        if (tablescope.new_record) {
                            /*tablescope.records.unshift(tablescope.new_record);
                             tablescope.new_record = undefined;
                             tablescope.show_new_record = false;*/

                        }
                    });
                }
            });
        }
    };
})
/**
 * draggable directive
 */
    .directive('draggable',function ($document) {
        return function (scope, element, attr) {
            var startX = 0, x = 0, movePercentage = 0,
                webtable_border = angular.element("#webtable-border"),
                webtable = angular.element("#webtable");
            // on mouse down
            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX + webtable_border.scrollLeft();
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });
            // on mouse move
            function mousemove(event) {
                x = event.pageX + webtable_border.scrollLeft();
                element.css({
                    left: x + 'px'
                });
            }

            // on mouse up
            function mouseup() {
                movePercentage = (x - startX) / webtable.width() * 100
                // emit a colResize event
                scope.$emit("colResize", scope.index, movePercentage);
                // unbind
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    }).directive('webtableCell',function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable-cell.html',
            replace: true,
            scope: true
        };
    }).directive('webtableCellNew',function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable-cell-new.html',
            replace: true,
            scope: true
        };
    }).directive('webtableCellQuery',function ($timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable-cell-query.html',
            replace: true,
            scope: true
        };
    }).directive("webtable",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/webtable.html'
        }
    }).directive("inputText",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/inputs/cell/input-text.html',
            replace: true
        }
    }).directive("inputCheckbox",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/inputs/cell/input-checkbox.html',
            replace: true
        }
    }).directive("inputDate",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/inputs/cell/input-date.html',
            replace: true
        }
    }).directive("inputTextNq",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/inputs/new-query/input-text.html',
            replace: true
        }
    }).directive("inputCheckboxNq",function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/inputs/new-query/input-checkbox.html',
            replace: true
        }
    }).directive("inputDateNq", function () {
        return {
            restrict: 'AE',
            templateUrl: 'templates/inputs/new-query/input-date.html',
            replace: true
        }
    });