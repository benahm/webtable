/**
 * Created by ahmed on 11/13/13.
 */

/**
 * utils module
 */
angular.module('utils', ["configuration"])

    .factory('utilsFactory', function () {
        return {
            pxToPercent: function (value, total) {
                return value / total * 100;
            },
            percentToPx: function (percent, total) {
                return total * percent / 100;
            },
            /**
             * make an array
             * @param length : length of the array
             * @returns {Array}
             */
            makeArray: function (length) {
                var array = [];
                for (var i = 0; i < length; i++) {
                    array.push(0);
                }
                return array;
            }
        }
    }
)
;