/**
 * 入口
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var vocabService = require("./service/vocabService");

var handle ={};
handle["/"]= requestHandlers.start;
handle["/start"]= requestHandlers.start;

handle["/show"]= requestHandlers.show;
handle["/query"]= requestHandlers.query;
handle["/excel"]= requestHandlers.excel;
handle["/httpGet"]= requestHandlers.httpGet;
handle["/httpGet"]= requestHandlers.httpGet;
handle["/vocab"]= vocabService.requestMapping;

server.start(router.route,handle);
//requestHandlers.httpGet();