const mysql = require("mysql");

//创建数据库连接池
const pool = new mysql.createPool({
    host:'**.**.**.**',
    user:'root',
    password:'**********',
    database:'***',
    port:3306
})

const connectMysql = function (sql,callback) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,function (error,results,fields) {
            connection.release();
            callback(error, results, fields)
        })
        
    })
    
}

module.exports = connectMysql