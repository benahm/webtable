/**
 * Created by ahmed on 11/11/13.
 */

angular.module("inputController", ["configuration"])
    .controller("inputController", function ($scope, $rootScope, constraintFactory) {
        $scope.test="hello world";
        $scope.type="text";
        var tablescope = $scope.$parent;// get scope of tableController


        $scope.tabindex=function(i,j){
            return i+1+(j+1)*$scope.datas.head.length;
        }


        /* apply changes */

        $scope.cellChanged=function(d,i,j){
            tablescope.datas.body[i][j]=d;
            console.log(d)
        }

        $scope.queryCellChanged=function(d,i){
            tablescope.query_record[i]=d;
        }

        $scope.newCellChanged=function(d,i){
            tablescope.new_record[i]=d;
        }

    });