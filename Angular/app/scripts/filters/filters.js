/**
 * Created by Bensaad on 08/11/13.
 */

var filtersModule=angular.module("filtersModule",[]);
filtersModule.filter('queryRecord', function() {
    return function(rows,query_record) {
        if(!query_record)return rows;
        var result=[];
        for(var j=0;j<rows.length;j++){
            var i,row=rows[j];
            for(i=0;i<row.length; i++){
                if((row[i].value+"").toLowerCase().indexOf(query_record[i].value.toLowerCase())==-1){
                    break;
                }
            }
            if(i==row.length)
                result.push(row);
        }
        return result;
    }
})