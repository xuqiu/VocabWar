/**
 * Created by yinzhennan on 2016/4/10.
 */
var querystring = require("querystring");
var fs = require("fs");
var mysql = require("./lib/mysql.js");
var wordUtil = require("./lib/wordUtil.js");
var deasync = require('deasync');

var jquery = fs.readFileSync("./lib/jquery.js", "utf-8");

var jsdom = require("jsdom");

var shttps=require('socks5-https-client')

//var xlsx = require("node-xlsx");

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
    // shttps.get({
    //     hostname:"ipv4.google.com",
    //     path:"/sorry/IndexRedirect?continue=https://www.google.com/search%3Fnum%3D1%26q%3Dduplicator&q=CGMSBKxgcWMY7IbhuAUiGQDxp4NLtTpbLmxy39ATOwGfMTV6LzhJ2-Y",
    //
    //     headers:{
    //         'avail-dictionary':'x0q89Mik',
    //         'x-client-data':'CI22yQEIorbJAQjBtskBCP2VygE=',
    //         'upgrade-insecure-requests':1,
    //         'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
    //         cookie:
    //             'SID=LgPEGaaCnVTZgii71ISWONbYNhYnPyeHYb5ZlmQOFACHEL6B-EpCVLdK9rbk_pGZh9XCfw.; HSID=AfNWoRwg_PP1SeYll; SSID=AlxO7tm3Q21OEKfIS; APISID=dpRKg33qgr18jt-0/Ao8i4lZ4pYjeCYd_P; SAPISID=e-ULnZ-1OIqYdipz/Az0E-32RuUqSZayO-; NID=78=GBeo8NhqrU2PuoVSMLcG3Y1rR0je5MOwA_m5lst0oPEiRRaN8QWbvrt10GMeDl9eZ9xfGcVpSAhRaj-tt4v9WBOG2AE184--IyNc_03ayi4hushR8t29nKTdII-9ereqxF_kUhFQhcSN8eFIId1diUIUHf4kOO069XeMJrsXah3NV_MsyuTWYehYj5AFzdkxlE6NpPMB9qNvRBEMfOPSoLyuvWyObm7eYjrJLkJrPqU-XdDZ9kvhhORRpOCWbADh5_BWBFrXa2txOGMApb4RmyrM; DV=Mii9ru9QPHMyoonTy6n6obpdK4FmqCoiL3hKVkQHHAAAAFrHmt2hTSuuJAAAAA; GOOGLE_ABUSE_EXEMPTION=ID=3e1f5c3dcfca6d85:TM=1461149210:C=c:IP=172.96.113.99-:S=APGng0sxtALoVCBH5HLN9p3m1qyI4EJhtQ'
    //
    //
    //
    //     },
    //     rejectUnauthorized: true // This is the default.
    // }, function(res) {
    //     res.setEncoding('utf8');
    //     var html_txt='';
    //     res.addListener("data", function(postDataChunk) {
    //         html_txt += postDataChunk;
    //     });
    //     res.addListener("end", function() {
    //         jsdom.env({
    //             html: html_txt,
    //             src: [jquery],
    //             proxy: process.env.https_proxy,
    //             done: function (err, window) {
    //                 var $ = window.$;
    //                 var num = $("#resultStats").text().replace(/[^0-9]/g,'');
    //                 if(num.length<4){
    //                     num=1000;
    //                 }
    //                 html_txt=html_txt.replace('img src="','img src="https://ipv4.google.com');
    //                 html_txt=html_txt.replace('CaptchaRedirect','https://ipv4.google.com/sorry/CaptchaRedirect');
    //
    //                 //func(word,num.substr(0,num.length-3));
    //                 response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    //                 response.write(html_txt + "\n");
    //                 response.end();
    //             }
    //         });
    //     });
    // });
    // return;

    mysql.query("select * from vocab where frequency=0 limit 20", function (error, vals, fields) {
        if (error) {
            // response.writeHead(500, {"Content-Type": "text/plain;charset=utf-8"});
            // response.write(error + "\n");
            // response.end();
            console.log(error);
            httpGet();
        } else {
            //response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
            //response.write(JSON.stringify(vals)+"\n");
            var current_num = 0;
            var error_msg="";
            for (var index_w in vals) {
                try {
                    current_num++;
                    var word = vals[index_w].word;
                    wordUtil.getFreq(word, response, function (word, num) {

                        if("error"==word){
                            error_msg = "error num";
                            return false;
                        }
                        current_num--;
                        console.log(word);
                        console.log(num);
                        mysql.run("update vocab set frequency=" + num + " where word=" + escape_sql(word));
                    });
                    if(error_msg){
                        return;
                    }
                    while (current_num > 0) {
                        deasync.runLoopOnce();
                    }
                } catch (e) {
                    var message = e.toString();
                    console.log(message);
                    if(message.indexOf("num")>0){
                        return;
                    }
                }
            }

            // response.write("完成\n");
            // response.end();
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
exports.show = show;
exports.query = query;
exports.excel = excel;
exports.httpGet = httpGet;