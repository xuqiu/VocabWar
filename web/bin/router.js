/**
 * Created by yinzhennan on 2016/4/10.
 */
function route(handle,pathname, response, request){
    console.log("About to route a request for "+ pathname);
    if(typeof handle[pathname]==='function'){
        try {
            handle[pathname](response, request);
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

exports.route = route;