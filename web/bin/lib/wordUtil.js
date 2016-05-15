/**
 * Created by yinzhennan on 2016/4/13.
 */
var fs = require("fs");
var jsdom = require("jsdom");
var jquery = fs.readFileSync("./lib/jquery.js", "utf-8");
var httpHelper = require("./httpHelper.js");

var socks5=require('socks5-http-client');
var shttps = require('socks5-https-client');
function getFreq_api(word, func) {
    var url="https://www.googleapis.com/customsearch/v1?key=AIzaSyCn_IE6NM_ATjZ0j5vfXIFlyW-EpGs5gsU&cx=006431901905483214390:i3yxhoqkzo0&num=1&alt=json&q="+word;


    shttps.get({
        hostname: 'www.googleapis.com',
        path: 'customsearch/v1?key=AIzaSyCn_IE6NM_ATjZ0j5vfXIFlyW-EpGs5gsU&cx=006431901905483214390:i3yxhoqkzo0&num=1&alt=json&q='+word,

        // headers:{
        //     'avail-dictionary':'x0q89Mik',
        //     'x-client-data':'CI22yQEIorbJAQjBtskBCP2VygE=',
        //     'upgrade-insecure-requests':1,
        //     'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
        //     cookie:
        //         'SID=LgPEGaaCnVTZgii71ISWONbYNhYnPyeHYb5ZlmQOFACHEL6B-EpCVLdK9rbk_pGZh9XCfw.; HSID=AfNWoRwg_PP1SeYll; SSID=AlxO7tm3Q21OEKfIS; APISID=dpRKg33qgr18jt-0/Ao8i4lZ4pYjeCYd_P; SAPISID=e-ULnZ-1OIqYdipz/Az0E-32RuUqSZayO-; NID=78=kDQRi0ndTE4gtoWfDCG5TH6FuK5iT_SddAl2jhNT4_L9wCRRMPUxFMy1Ivh56Sa652KRTpAqwVZmdjFtQ4pA6RkDz5-7CnyyDra_7Acv6h5SUUNZ8lH8OTs6Sxp9OmD8KiIps4I1tFZLE3XKYsDHZ5Ic9jSBFiS-Rw9bZMqX6VNRZM0XQTSt3TaIvT_wW_cjbuwecy_gp_DgoZYwmuqfZZfZIY2QMfvDx6X_TJGepw56Mfx_CVfVAY9vq053v0F46B_Oy57fDGRb4ym6tgVy5iaT; GOOGLE_ABUSE_EXEMPTION=ID=57b34a929a49b289:TM=1461117253:C=c:IP=199.83.51.22-:S=APGng0szPOV2Wqlwyw5-rUUxLalfRyivNQ'
        //
        // },
        rejectUnauthorized: true // This is the default.
    }, function(res) {
        res.setEncoding('utf8');
        var html_txt='';
        res.addListener("data", function(postDataChunk) {
            html_txt += postDataChunk;
        });
        res.addListener("end", function() {
            var result = JSON.parse(html_txt);
            var num = result.queries.request[0].totalResults;
            if(num.length<4){
                num=1000;
            }
            func(word,num.substr(0,num.length-3));
        });
    });
    return;



    httpHelper.get(url, 20000,
        function (err, data) {
            if (err) {
                console.log(err);
            }else{
                var result = JSON.parse(data);
                var num = result.queries.request[0].totalResults;
                if(num.length<4){
                    num=1000;
                }
                func(word,num.substr(0,num.length-3));
            }
        }
        , 'utf-8'
        , {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
        });
}
function getFreq(word, response, func) {
    shttps.get({
        hostname: 'www.google.com',
        path: '/search?num=1&q='+word,


        headers:{
            'avail-dictionary':'x0q89Mik',
            'x-client-data':'CI22yQEIorbJAQjBtskBCP2VygE=',
            'upgrade-insecure-requests':1,
            'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
            cookie:
'SID=LgPEGaaCnVTZgii71ISWONbYNhYnPyeHYb5ZlmQOFACHEL6B-EpCVLdK9rbk_pGZh9XCfw.; HSID=AfNWoRwg_PP1SeYll; SSID=AlxO7tm3Q21OEKfIS; APISID=dpRKg33qgr18jt-0/Ao8i4lZ4pYjeCYd_P; SAPISID=e-ULnZ-1OIqYdipz/Az0E-32RuUqSZayO-; NID=78=GBeo8NhqrU2PuoVSMLcG3Y1rR0je5MOwA_m5lst0oPEiRRaN8QWbvrt10GMeDl9eZ9xfGcVpSAhRaj-tt4v9WBOG2AE184--IyNc_03ayi4hushR8t29nKTdII-9ereqxF_kUhFQhcSN8eFIId1diUIUHf4kOO069XeMJrsXah3NV_MsyuTWYehYj5AFzdkxlE6NpPMB9qNvRBEMfOPSoLyuvWyObm7eYjrJLkJrPqU-XdDZ9kvhhORRpOCWbADh5_BWBFrXa2txOGMApb4RmyrM; DV=Mii9ru9QPHMyoonTy6n6obpdK4FmqCoiL3hKVkQHHAAAAFrHmt2hTSuuJAAAAA; GOOGLE_ABUSE_EXEMPTION=ID=3e1f5c3dcfca6d85:TM=1461149210:C=c:IP=172.96.113.99-:S=APGng0sxtALoVCBH5HLN9p3m1qyI4EJhtQ'



        },
        rejectUnauthorized: true // This is the default.
    }, function(res) {
        if(res.statusCode==302){
            inputValiCode(res.headers.location,response);
            func("error");
            return;
        }
        res.setEncoding('utf8');
        var html_txt='';
        res.addListener("data", function(postDataChunk) {
            html_txt += postDataChunk;
        });
        res.addListener("end", function() {
            jsdom.env({
                html: html_txt,
                src: [jquery],
                proxy: process.env.https_proxy,
                done: function (err, window) {
                    var $ = window.$;
                    var num = $("#resultStats").text().replace(/[^0-9]/g,'');
                    if(num.length<4){
                        num=1000;
                    }
                    func(word,num.substr(0,num.length-3));
                }
            });
        });
    });

}
function inputValiCode(url,response){
    shttps.get({
        url: "https://ipv4.google.com/sorry/IndexRedirect?continue=https://www.google.com/search%3Fnum%3D1%26q%3Dduplicator&q=CGMSBKxgcWMY7IbhuAUiGQDxp4NLtTpbLmxy39ATOwGfMTV6LzhJ2-Y",


        headers:{
            'avail-dictionary':'x0q89Mik',
            'x-client-data':'CI22yQEIorbJAQjBtskBCP2VygE=',
            'upgrade-insecure-requests':1,
            'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
            cookie:
                'SID=LgPEGaaCnVTZgii71ISWONbYNhYnPyeHYb5ZlmQOFACHEL6B-EpCVLdK9rbk_pGZh9XCfw.; HSID=AfNWoRwg_PP1SeYll; SSID=AlxO7tm3Q21OEKfIS; APISID=dpRKg33qgr18jt-0/Ao8i4lZ4pYjeCYd_P; SAPISID=e-ULnZ-1OIqYdipz/Az0E-32RuUqSZayO-; NID=78=GBeo8NhqrU2PuoVSMLcG3Y1rR0je5MOwA_m5lst0oPEiRRaN8QWbvrt10GMeDl9eZ9xfGcVpSAhRaj-tt4v9WBOG2AE184--IyNc_03ayi4hushR8t29nKTdII-9ereqxF_kUhFQhcSN8eFIId1diUIUHf4kOO069XeMJrsXah3NV_MsyuTWYehYj5AFzdkxlE6NpPMB9qNvRBEMfOPSoLyuvWyObm7eYjrJLkJrPqU-XdDZ9kvhhORRpOCWbADh5_BWBFrXa2txOGMApb4RmyrM; DV=Mii9ru9QPHMyoonTy6n6obpdK4FmqCoiL3hKVkQHHAAAAFrHmt2hTSuuJAAAAA; GOOGLE_ABUSE_EXEMPTION=ID=3e1f5c3dcfca6d85:TM=1461149210:C=c:IP=172.96.113.99-:S=APGng0sxtALoVCBH5HLN9p3m1qyI4EJhtQ'



        },
        rejectUnauthorized: true // This is the default.
    }, function(res) {
        res.setEncoding('utf8');
        var html_txt='';
        res.addListener("data", function(postDataChunk) {
            html_txt += postDataChunk;
        });
        res.addListener("end", function() {
            jsdom.env({
                html: html_txt,
                src: [jquery],
                proxy: process.env.https_proxy,
                done: function (err, window) {
                    var $ = window.$;
                    var num = $("#resultStats").text().replace(/[^0-9]/g,'');
                    if(num.length<4){
                        num=1000;
                    }
                    //func(word,num.substr(0,num.length-3));
                    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
                    response.write(html_txt + "\n");
                    response.end();
                }
            });
        });
    });

}
exports.getFreq = getFreq;
exports.getFreq_api=getFreq_api;