/**
 * Created by yinzhennan on 2016/4/13.
 */
var fs = require("fs");
var jsdom = require("jsdom");
var jquery = fs.readFileSync("./lib/jquery.js", "utf-8");
var httpHelper = require("./httpHelper.js");
function getFreq_api(word, func) {
    var url="https://www.googleapis.com/customsearch/v1?key=AIzaSyCn_IE6NM_ATjZ0j5vfXIFlyW-EpGs5gsU&cx=006431901905483214390:i3yxhoqkzo0&num=1&alt=json&q="+word;
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
function getFreq(word, func) {
    jsdom.env({
        url: "https://www.google.com/search?num=1&q="+word,
        src: [jquery],
        done: function (err, window) {
            var $ = window.$;
            var num = $("#resultStats").text().replace(/[^0-9]/g,'');
            if(num.length<4){
                num=1000;
            }
            func(word,num.substr(0,num.length-3));
        }
    });

}
exports.getFreq = getFreq;