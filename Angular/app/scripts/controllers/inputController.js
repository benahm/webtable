/**
 * Created by ahmed on 11/11/13.
 */

angular.module("inputController", ["configuration"])
    .controller("inputController", function ($scope, $rootScope, constraintFactory) {
        $scope.test="hello world";
        $scope.type="bool";
        var tablescope = $scope.$parent;// get scope of tableController


        $scope.tabindex=function(i,j){
            return i+1+(j+1)*$scope.datas.head.length;
        }


        /* apply changes */

        $scope.cellChanged=function(d,i,j){
            tablescope.datas.body[i][j]=d;
            console.log(d)
        }
        $scope.nqCellChanged=function(d,n,q,i){
            console.log(d,n,q,i);
            if(n){
                tablescope.new_record[i]=d;
            }else tablescope.query_record[i]=d;
        }

    });