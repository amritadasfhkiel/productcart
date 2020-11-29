var dbconnection=function () {
    var mysql = require('mysql');
    var sql = mysql.createConnection({
        host : 'aqx5w9yc5brambgl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        port : 3306,
        database: 'w8dtfgkhc1dpzp3t',
        user : 'ok37pp6h5vg2psuk',
        password : 'rjziff59e4o5hqpk'
    });
    sql.connect(function(err){
        if(err!=null)console.log(err);
        else
            console.log("DB Connection successfully made");
    });
    return sql;
};
exports.dbConnection = dbconnection;

