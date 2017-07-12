let getConnection = require('../db-services/connection.js')

function getList(){

    return new Promise( (resolve, reject) => {

	    let connection = getConnection();

	    connection.query('select * from reservation', function(err, res){
	       	connection.end();

	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
    
    
}

function addReservation(newReservation){

    return new Promise( (resolve, reject) => {
    	const {date, start, end, nameReq, room} = newReservation; 

    	let connection = getConnection();

    	let queryTemp = `INSERT INTO reservation (DateReserve, StartHour, EndHour, Name, RoomId)
	    				 VALUES (STR_TO_DATE("${date}",'%d-%m-%Y'),
	    				 		 STR_TO_DATE("${start}",'%H:%i:%s'),
	    				 		 STR_TO_DATE("${end}",'%H:%i:%s'),
	    				 		 "${nameReq}",
	    				 		 "${room}")`;

	    console.log(queryTemp);
	    connection.query(queryTemp, function(err, res){

			connection.end();	

			//console.log(res);    				 		 	
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
    
    
}

function editReservation(editedReservation){

    return new Promise( (resolve, reject) => {
    	const {id, date, start, end, nameReq, room} = editedReservation; 

    	let connection = getConnection();

    	let queryTemp = `UPDATE reservation SET DateReserve=DATE(STR_TO_DATE("${date}",'%d-%m-%Y')), StartHour=DATE(STR_TO_DATE("${start}",'%H:%i:%s')), EndHour=DATE(STR_TO_DATE("${end}",'%H:%i:%s')), Name="${nameReq}", RoomId="${room}" WHERE Id=${id}`;

    	console.log(queryTemp);
	    connection.query(queryTemp, function(err, res){
	        connection.end();

	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
 
    
}

function deleteReservation(reservationId){

    return new Promise( (resolve, reject) => {
    	const {id} = reservationId; 

    	let connection = getConnection();

	    connection.query(`DELETE FROM reservation WHERE Id=${id}`, function(err, res){
	        connection.end();

	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
 
    
}

function getReservation(reservationId) {

    return new Promise( (resolve, reject) => {

    	let connection = getConnection();

    	let queryTemp = `select * from reservation WHERE Id=${reservationId}`;
    	console.log(queryTemp);
	    connection.query(queryTemp, function(err, res){
	    	connection.end();
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
 
    
}

module.exports = {
	getList,
	addReservation,
	editReservation,
	deleteReservation,
	getReservation
}