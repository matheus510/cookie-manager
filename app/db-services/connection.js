let mysql = require('mysql');

function connection() { 

	return mysql.createConnection({
	    host: 'localhost',
	    port: '3307',
	    user: 'root',
	    password: 'root',
	    database: 'cookiemanager',
	    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' 
	});
}

module.exports = connection;
