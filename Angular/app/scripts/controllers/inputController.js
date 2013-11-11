/**
 * Created by ahmed on 11/11/13.
 */

angular.module("inputController", ["configuration"])
    .controller("inputController", function ($scope, $rootScope, constraintFactory) {
        $scope.test="hello world";

        var binds={
            text:"text",
            bool:"checkbox",
            numeric:"",
            date:"date",
            currency:"currency"
        }

    });