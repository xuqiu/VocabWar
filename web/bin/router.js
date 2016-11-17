/**
 * restful router
 */
function route(handle,pathname, response, request){
    console.log("About to route a request for "+ pathname);
    var pathArray = pathname.split("/");
    for(var i in pathArray){
        console.error(pathArray[i]);
        if(!pathArray[i]){continue}
        handle = handle["/"+pathArray[i]];
        if(typeof handle==='object'){
            
        }else if(typeof handle==='function'){
            try {
                response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
                i=Number(i);
                handle(response, request,pathArray[i+1],pathArray[i+2],pathArray[i+3],pathArray[i+4]);
                return;
            } catch (e) {
                console.error("",e);
            }
        }else{
            console.log("No request handler found for "+ pathname);
            response.writeHead(404,{"Content-Type":"text/plain"});
            response.write("404 Not found");
            response.end();
        }

    }

}

exports.route = route;