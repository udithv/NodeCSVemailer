var csv = require('fast-csv');
var fs = require('fs');

var stream = fs.createReadStream("./uploads/emaillist1.csv");
 
csv
 .fromStream(stream, {headers : true})
 .on("data", function(data){
     console.log(data);
 })
 .on("end", function(){
     console.log("done");
 });


