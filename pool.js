var mysql = require('mysql')
var pool = mysql.createPool({ 
    host:'localhost',
    user:'root',
    password:'123',
    port:3306,
    database:'sowmtdb',
    connectionlimit:'100'
});
module.exports = pool;
