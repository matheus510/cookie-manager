const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'cookiemanager',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' 
    });

     connection.query('select * from reservation', function(err, res){
        if(err){
            return res.send(err);
        }

        res.send(res);
    });

    
    connection.end();
});


module.exports = router
