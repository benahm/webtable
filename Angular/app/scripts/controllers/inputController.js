/**
 * Created by ahmed on 11/11/13.
 */

angular.module("inputController", ["configuration"])
    .controller("inputController", function ($scope, $rootScope, constraintFactory,config) {
        $scope.test="hello world";
        $scope.type="text";
        var tablescope = $scope.$parent.$parent;// get scope of tableController


        $scope.tabindex=function(i,j){
            return i+1+(j+1)*config.fields.length;
        }

        $scope.inputType=function(columnIndex){
            return config.fields[columnIndex].type
        }

        /* apply changes */

        $scope.cellChanged=function(d,i,j){
            tablescope.records[i][j]=d;
            $scope.$emit("recordChanged");
        }
        $scope.nqCellChanged=function(d,n,q,i){
            console.log(d,n,q,i,tablescope);
            if(n){
                tablescope.new_record[i]=d;
            }else tablescope.query_record[i]=d;
        }

    });