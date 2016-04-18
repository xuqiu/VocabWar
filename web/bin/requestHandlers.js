/**
 * Created by yinzhennan on 2016/4/10.
 */
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var mysql = require("./lib/mysql.js");
var wordUtil = require("./lib/wordUtil.js");
var deasync = require('deasync');

var jsdom = require("jsdom");
var jquery = fs.readFileSync("./lib/jquery.js", "utf-8");

var xlsx = require("node-xlsx");

function start(response, request) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.uploadDir = 'e:/tmp';
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "/tmp/test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}
function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
function query(response) {
    console.log("Request handler 'query' was called.");
    mysql.query("select * from vocab limit 1000,10", function (error, vals, fields) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
            response.write(JSON.stringify(vals) + "\n");
            //response.write(JSON.stringify(fields)+"\n");
            response.end();
        }
    });
}
function excel(response, request) {
    console.log("Request handler 'excel' was called.");
    // response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    // var list = xlsx.parse("e:/tmp/vocab.xls");
    // var dictList = list[1].data;

    // for (var index_w in dictList)
    // {
    //     var word = dictList[index_w];
    //     var sql = "insert into vocab values("+escape_sql(word[1])+","+escape_sql(word[2])+","+escape_sql(word[3])+")";
    //
    //     mysql.query(sql,function(error,vals,fields){
    //         var msg;
    //         if(error){
    //             msg=error +"<br>";
    //         }else{
    //             msg="导入成功"+"<br>";
    //         }
    //
    //         console.log(msg);
    //     });
    // }
    //list[1].data[1][3]

}
function httpGet(response, request) {


    mysql.query("select * from vocab where frequency=0", function (error, vals, fields) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
            //response.write(JSON.stringify(vals)+"\n");
            var current_num = 0;

            for (var index_w in vals) {
                // try {
                    current_num++;
                    var word = vals[index_w].word;
                    wordUtil.getFreq(word, function (word, num) {
                        current_num--;
                        console.log(word);
                        console.log(num);
                        mysql.run("update vocab set frequency=" + num + " where word=" + escape_sql(word));
                    });
                    while (current_num > 1) {
                        deasync.runLoopOnce();
                    }
                // } catch (e) {
                //     console.log(e.toString());
                // }
            }

            response.write("完成\n");
            response.end();
        }
    });


}
function escape_sql(word) {
    if (word) {
        return "'" + word.replace("'", "\\'") + "'";
    } else {
        return "null";
    }
}
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.query = query;
exports.excel = excel;
exports.httpGet = httpGet;