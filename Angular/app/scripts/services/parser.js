/**
 * Created by Bensaad on 08/11/13.
 */

var boolParser = angular.module('parser', [])

.factory('boolParserFactory',function () {

    /**
     * @link : http://docs.oracle.com/cd/B40099_02/books/ToolsDevRef/ToolsDevRef_Operators18.html
     *
     * QBE Statement

     :   condition
     :   expression

     Condition

     :   comparison
     :   NOT comparison
     :   comparison [AND | OR] comparison

     Comparison

     :   [expression]  [= | < | > | <= | >= |]  expression

     Expression

     :   constant
     :   identifier

     Constant

     :   number
     :   string (double quoted)

     Identifier

     :   [field name]
     */
    var comparators = ["<", ">", "<=", ">=", "="];

    var parser = {
        /* parse any qbe */
        parse: function (scope, qbe) {
            if (parser.isExpression(scope, qbe))
                parser.parseExpression(scope, qbe);
            else parser.parseCondition(scope, qbe);
        },
        /* parse a qbe if it's condition */
        parseCondition: function (scope, qbe) {
            var op, qbe_trim = qbe.trim();
            // NOT
            if (qbe_trim.toUpperCase().indexOf("NOT") == 0 && qbe_trim[3] == " ") {
                console.log("NOT")
                return !parser.parseComparaison(scope, qbe_trim.substr(4));
            }
            // AND
            var index = qbe_trim.toUpperCase().indexOf("AND");
            if (index != -1) {
                var _and = qbe_trim.substr(index, 3);
                var parts = qbe_trim.split(_and);
                console.log(parts)
                if (parts[0] != "" && parts[1] != "" && parts[0][parts[0].length - 1] == " " && parts[1][0] == " ")
                    return parser.parseComparaison(scope, parts[0]) && parser.parseComparaison(scope, parts[1]);
            }
            // OR
            index = qbe_trim.toUpperCase().indexOf("OR");
            if (index != -1) {
                var _and = qbe_trim.substr(index, 2);
                var parts = qbe_trim.split(_and);
                if (parts[0] != "" && parts[1] != "" && parts[0][parts[0].length - 1] == " " && parts[1][0] == " ")
                    return parser.parseComparaison(scope, parts[0]) || parser.parseComparaison(scope, parts[1]);
            }
            console.log("Else", qbe_trim)
            // Comparaison
            return parser.parseComparaison(scope, qbe_trim);

        },
        /* test equality of two value pattern match if string */
        equals: function (val1, val2) {
            if (typeof(val2) === "string") {

                var pattern = val2.replace("*", ".*");
                console.log(pattern)
                return (val1.match(pattern)== val1);
            }
            else return val1 == val2;
        },
        /* parse a comparaison */
        parseComparator: function (scope, cmp, val1, val2) {
            if (!val1)
                val1 = scope.val;
            console.log(val1, val2)
            switch (cmp) {
                case "<":
                    return val1 < val2
                    break;
                case ">":
                    return val1 > val2
                    break;
                case "<=":
                    return val1 <= val2
                    break;
                case ">=":
                    return val1 >= val2
                    break;
                case "=":
                    return parser.equals(val1, val2);
                    break;
            }
        },
        /* test if the qbe is a comparaison */
        isComparaison: function (scope, qbe) {
            var cmp_in = false, cmp, qbe_trim = qbe.trim(); // trim
            // test if the qbe contain a comparator
            for (var i = 0; i < comparators.length; i++) {
                cmp = comparators[i];
                console.log(comparators[i])
                if (qbe_trim.indexOf(comparators[i]) != -1) {
                    cmp_in = true;
                    break;
                }
            }
            console.log("in?", cmp_in)
            if (!cmp_in) return false; // no comparator
            var parts = qbe_trim.split(cmp);
            console.log(parts)
            // comparaison with the value val
            // ex : "< 123"
            if (parts.length == 2 && parts[0].trim() == "" && parser.isExpression(scope, parts[1]) && parts[1][0] == " ")
                return cmp
            // comparaison between two expression
            // ex: "123 < 124"
            if (parts.length == 2 && parts[0][parts[0].length - 1] == " " &&
                parts[1][0] == " " && parser.isExpression(scope, parts[0]) &&
                parser.isExpression(scope, parts[1])) return cmp;
            console.log("failed")
            return false;
        },
        /* parse a comparaison */
        parseComparaison: function (scope, qbe) {
            var cmp = parser.isComparaison(scope, qbe)
            if (cmp) {
                var parts = qbe.split(cmp);
                console.log(parts)
                var val1 = false;
                if (!(parts[0] == ""))// could be empty
                    val1 = parser.parseExpression(scope, parts[0]);
                var val2 = parser.parseExpression(scope, parts[1]);
                // parse
                return parser.parseComparator(scope, cmp, val1, val2);
            }
            return "Eveluated";
            throw new Error("not compraison")
        },
        /* test if a qbe is an expression*/
        isExpression: function (scope, qbe) {
            return  parser.isConstant(scope, qbe) || parser.isIdentifier(scope, qbe);
        },
        /* parse un expression */
        parseExpression: function (scope, qbe) {
            if (parser.isExpression(scope, qbe)) {
                if (parser.isIdentifier(scope, qbe))
                    return parser.parseIdentifier(scope, qbe);
                else if (parser.isConstant(scope, qbe)) {
                    return parser.parseConstant(scope, qbe);
                }
            }
        },
        /* test if the qbe is an identifier */
        isIdentifier: function (scope, qbe) {
            var qbe_trim = qbe.trim(), qbe_l_1 = qbe_trim.length - 1;
            if (qbe_trim[0] === "[" && qbe_l_1 !== 0 && qbe_trim[qbe_l_1] === "]")
                var id = _.filter(_.keys(scope.identifiers), function (e) {
                    return e == [qbe_trim.substr(1, qbe_l_1 - 1)]
                })
            if (id) return id;
            return false;
        },
        /* parse un identifier */
        parseIdentifier: function (scope, qbe) {
            var id = parser.isIdentifier(scope, qbe);
            console.log("id", id)
            if (id) return parser.parseConstant(scope, scope.identifiers[id] + "");
            else throw new Error("identifier not found")
        },
        /* test if the qbe is constant */
        isConstant: function (scope, qbe) {
            var qbe_trim = qbe.trim(), qbe_l_1 = qbe_trim.length - 1; // trim
            // string
            if ((qbe_trim[0] === '"' && qbe_l_1 !== 0 && qbe_trim[qbe_l_1] === '"' ))
                return "string";
            // integer
            if (!isNaN(qbe))
                return "int"
            return false;
        },
        /* parse a constant */
        parseConstant: function (scope, qbe) {
            var type = parser.isConstant(scope, qbe); // type
            switch (type) {
                case "int": // integer
                    return parseInt(qbe.trim(), 10);
                case "string": // string
                    return qbe.trim();
            }
            return 0;
        }
    };

    return parser;
});
