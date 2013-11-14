/**
 * Created by ahmed on 11/10/13.
 */
/**
 * constraint management module
 */
angular.module('constraint', ["configuration"])

    .factory('constraintFactory', function () {
        //Constraint functions to check
        var _constraints = {
            required: function (datacell, settings) {
                var message = settings;
                if (!datacell) return message;
            }
        }
        // check constraints
        var checker = {
            /**
             * Check all constraints one cell from de table
             * @param datacell the value of the cell on which to check the constraint
             * @param constaints all constraints of a giving column
             * @returns {Array} messages to display if the constraint is violated
             */
            check: function (datacell, constraints) {
                var messages = [];
                for (var constraint in constraints) {
                    var cnst = _constraints[constraint](datacell, constraints[constraint]);
                    if (cnst)
                        messages.push(cnst);
                }
                return messages
            },
            /***
             * check all constraints on a giving record till find a violated constraint
             * @param record on which to check the constraints
             * @param head all the head data that contains constraints of each column
             * @returns {
             * {index: number, index of the first column where a constraint is violated
              * messages: Array all the messages to display to the user
              * }}
             */
            checkAll: function (record, head) {
                for (var i = 0; i < record.length; i++) {
                    var messages = checker.check(record[i], head[i].constraints);
                    if (messages.length)
                        return {index: i, messages: messages};
                }
            }
        }
        return checker;
    });
