let connection = require('.app/db-services/connection.js')

function getReservationsList(){

    return new Promise( (resolve, reject) => {

	    connection.query('select * from reservation', function(err, res){
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
    
    connection.end();
}

function addReservation(newReservation){

    return new Promise( (resolve, reject) => {
    	const {id, date, startHour, endHour, requesterName, requesterId, roomId} = newReservation; 


	    connection.query(`INSERT INTO reservation (Date, In, Out, RequesterName, RequesterId, RoomId)
	    				 VALUES (${date},
	    				 		 ${startHour},
	    				 		 ${endHour},
	    				 		 ${requesterName},
	    				 		 ${requesterId},
	    				 		 ${roomId})`, function(err, res){
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
    
    connection.end();
}

function editReservation(newReservation){

    return new Promise( (resolve, reject) => {
    	const {id, date, startHour, endHour, requesterName, requesterId, roomId} = newReservation; 


	    connection.query(`UPDATE reservation SET 'Date'=?, 'In'=?, 'Out'=?, 'RequesterName'=?, 'RequesterId'=?, 'RoomId'=?, WHERE Id=?` [date, startHour, endHour, requesterName, requesterId, roomId, id], function(err, res){
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
 
    connection.end();
}

function deleteReservation(reservationId){

    return new Promise( (resolve, reject) => {

	    connection.query('DELETE FROM `reservation` WHERE `id`=?' [reservationid], function(err, res){
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
 
    connection.end();
}

function getReservation(reservationId) {

    return new Promise( (resolve, reject) => {

	    connection.query('select * from reservation WHERE `id`=?' [reservationid], function(err, res){
	        if(err)
	        	return reject(err);

	        return resolve(res);
	    });

    })
 
    connection.end();
}

module.exports = {
	getList,
	addReservation,
	editReservation,
	deleteReservation,
	getReservation
}