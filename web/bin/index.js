/**
 * Created by yinzhennan on 2016/4/10.
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle ={}
handle["/"]= requestHandlers.start;
handle["/start"]= requestHandlers.start;

handle["/show"]= requestHandlers.show;
handle["/query"]= requestHandlers.query;
handle["/excel"]= requestHandlers.excel;
handle["/httpGet"]= requestHandlers.httpGet;

//server.start(router.route,handle);
requestHandlers.httpGet();