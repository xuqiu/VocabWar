/**
 * Created by yinzhennan on 2016/4/12.
 */
var mysql=require("mysql");
var pool = mysql.createPool({
    host: '192.168.1.100',
    user: 'vw',
    password: 'qweqwe',
    database: 'vw',
    port: '3306'
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                console.log(sql);
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr,vals,fields);
            });
        }
    });
};
var run=function(sql){
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                console.log(sql);
                //释放连接
                conn.release();
            });
        }
    });
}
exports.query = query;
exports.run = run;