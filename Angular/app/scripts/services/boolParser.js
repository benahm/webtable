/**
 * Created by Bensaad on 08/11/13.
 */

//var boolParser = angular.module('boolParser', [])

//.factory('boolParserFactory',
var parser = function () {

    /**
     * @link : http://docs.oracle.com/cd/B40099_02/books/ToolsDevRef/ToolsDevRef_Operators18.html
     *
     * QBE Statement

     :   condition
     :   expression

     Condition

     :   comparison
     :   NOT condition
     :   condition [AND | OR] condition

     Comparison

     :   expression [~] [= | < | > | <= | >= | [NOT] [~] LIKE] expression

     Expression

     :   constant
     :   identifier
     :   function

     Constant

     :   number
     :   string (double quoted)
     :   date (double quoted)   "MM/DD/YY"
     (separator must be "/")
     :   time (double quoted)   "HH:MM:SS"
     (separator must be ":")
     :   date and time (double quoted)
     "MM/DD/YY HH:MM:SS"   (space required)

     Identifier

     :   [field name]
     */

    // AST
    val = 123,
        identifier = {name: "10"},
        constant = [],
        expression = [constant, identifier],
        comporator = ["~", "=", "<", ">"],
        comparison = expression + comporator + expression,
        condition = [comparison, "NOT" + condition, condition + "OR" + condition, condition + "AND" + condition],
        QBE = [expression, condition]

    var parser = {
        /* parse any qbe */
        parse: function (qbe) {
            if (parser.isExpression(qbe))
                parser.parseExpression(qbe);
            else parser.parseCondition(qbe);
        },
        /* parse a qbe if it's condition */
        parseCondition: function (qbe) {
            var op, qbe_trim = qbe.trim();
            // NOT
            if (qbe_trim.toUpperCase().indexOf("NOT") == 0 && qbe_trim[3] == " ") {
                console.log("NOT")
                return parser.parseCondition(qbe_trim.substr(4));
            }
            // AND
            var index = qbe_trim.toUpperCase().indexOf("AND");
            if (index != -1) {
                var _and = qbe_trim.substr(index, 3);
                var parts = qbe_trim.split(_and);
                console.log(parts)
                if (parts[0] != "" && parts[1] != "" && parts[0][parts[0].length - 1] == " " && parts[1][0] == " ")
                    return parser.parseCondition(parts[0]) && parser.parseCondition(parts[1]);
            }
            // OR
            index = qbe_trim.toUpperCase().indexOf("OR");
            if (index != -1) {
                var _and = qbe_trim.substr(index, 2);
                var parts = qbe_trim.split(_and);
                if (parts[0] != "" && parts[1] != "" && parts[0][parts[0].length - 1] == " " && parts[1][0] == " ")
                    return parser.parseCondition(parts[0]) || parser.parseCondition(parts[1]);
            }
            console.log("Else", qbe_trim)
            // Comparaison
            return parser.parseComparaison(qbe_trim);

        },
        /* parse a comparaison */
        parseComparator: function (cmp, val1, val2) {
            if (!val1)
                val1 = val;
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

            }

        },
        /* test if the qbe is a comparaison */
        isComparaison: function (qbe) {
            var cmp_in = false, cmp, qbe_trim = qbe.trim(); // trim
            // test if the qbe contain a comparator
            for (var i = 0; i < comporator.length; i++) {
                cmp = comporator[i];
                console.log(comporator[i])
                if (qbe_trim.indexOf(comporator[i]) != -1) {
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
            if (parts.length == 2 && parts[0].trim() == "" && parser.isExpression(parts[1]) && parts[1][0] == " ")
                return cmp
            // comparaison between two expression
            // ex: "123 < 124"
            if (parts.length == 2 && parts[0][parts[0].length - 1] == " " &&
                parts[1][0] == " " && parser.isExpression(parts[0]) &&
                parser.isExpression(parts[1])) return cmp;
            console.log("failed")
            return false;
        },
        /* parse a comparaison */
        parseComparaison: function (qbe) {
            var cmp = parser.isComparaison(qbe)
            if (cmp) {
                var parts = qbe.split(cmp);
                console.log(parts)
                var val1 = false;
                if (!(parts[0] == ""))// could be empty
                    val1 = parser.parseExpression(parts[0]);
                var val2 = parser.parseExpression(parts[1]);
                console.log(val1, val2)
                // parse
                return parser.parseComparator(cmp, val1, val2);
            }
            return "Eveluated";
            throw new Error("not compraison")
        },
        /* test if a qbe is an expression*/
        isExpression: function (qbe) {
            return parser.isFunction(qbe) || parser.isConstant(qbe) || parser.isIdentifier(qbe);
        },
        /* parse un expression */
        parseExpression: function (qbe) {
            if (parser.isExpression(qbe)) {
                if (parser.isIdentifier(qbe))
                    return parser.parseIdentifier(qbe);
                else if (parser.isConstant(qbe)) {
                    return parser.parseConstant(qbe);
                }
            }
            return parser.parseFunction(qbe);
        },
        /* test if the qbe is an identifier */
        isIdentifier: function (qbe) {
            var qbe_trim = qbe.trim(), qbe_l_1 = qbe_trim.length - 1;
            if (qbe_trim[0] === "[" && qbe_l_1 !== 0 && qbe_trim[qbe_l_1] === "]")
                var id = _.filter(_.keys(identifier), function (e) {
                    return e == [qbe_trim.substr(1, qbe_l_1 - 1)]
                })
            if (id) return id;
            return false;
        },
        /* parse un identifier */
        parseIdentifier: function (qbe) {
            var id = parser.isIdentifier(qbe);
            console.log("id", id)
            if (id) return parser.parseConstant(identifier[id]);
            else throw new Error("identifier not found")
        },
        /* test if the qbe is constant */
        isConstant: function (qbe) {
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
        parseConstant: function (qbe) {
            var type = parser.isConstant(qbe); // type
            switch (type) {
                case "int": // integer
                    return parseInt(qbe.trim(), 10);
                case "string": // string
                    return qbe.trim();
            }
            return 0;
        },
        isFunction: function (qbe) {
            return false;
        },
        parseFunction: function (qbe) {
            return false;
        }
    };

    return parser;
}//);
