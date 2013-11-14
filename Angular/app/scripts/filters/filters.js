/**
 * Created by Ahmed on 08/11/13.
 */
/**
 * All filters of the project
 * @type {*}
 */
var filtersModule=angular.module("filtersModule",["configuration"]);
filtersModule
/**
 * queryRecord : filters used when a query is made
 */
    .filter('queryRecord', function() {
    return function(rows,query_record) {
        if(!query_record)return rows;
        var result=[];
        for(var j=0;j<rows.length;j++){
            var i,row=rows[j];
            for(i=0;i<row.length; i++){
                if((row[i]+"").toLowerCase().indexOf((query_record[i]+"").toLowerCase())==-1){
                    break;
                }
            }
            if(i==row.length)
                result.push(row);
        }
        return result;
    }
});