
var mysql = require("./../lib/mysql.js");

var requestMapping={};

requestMapping["/listByUser"]=  listByUser;
function listByUser(response, request,user_id) {
    console.log("vocabService listByUser called.");
    mysql.query("select * from user_vocab where user_id="+user_id, function (error, vals, fields) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
            response.write(error + "\n");
            response.end();
        } else {
            response.write(JSON.stringify(vals));
            response.end();
        }
    });
}
exports.requestMapping = requestMapping;