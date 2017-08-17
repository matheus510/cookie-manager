let getConnection = require('../db-services/connection.js')
let moment = require('moment')

function getDayReservationList(day) {
	return new Promise( (resolve, reject) => {
		
		if (!day) {
			var dayStart = moment()
			var dayEnd = moment().add(1, 'd')
		} else {
			var dayStart = moment(day).format('YYYY[-]MM[-]DD[ ]HH[:]mm[:]ss')
			var dayEnd = moment(day).add(1, 'day').format('YYYY[-]MM[-]DD[ ]HH[:]mm[:]ss')
			console.log(dayStart)
			console.log(dayEnd)
		}

		let queryTemp = `SELECT * FROM reservation 
				WHERE DateReserveStart >= "${dayStart}" AND DateReserveEnd < "${dayEnd}"`
		
		let connection = getConnection()
			connection.query(queryTemp, function(err, res) {
			connection.end()
			
			if(err)
				return reject(err)
			
			return resolve(res)
		})
	} )
}

function getRoomList() {
	
	return new Promise( (resolve, reject) => {
		
		let connection = getConnection()
		
		connection.query('select * from room', function(err, res){
			connection.end()

			if(err)
				return reject(err)
			
			return resolve(res)
		})
	})	
}

function addReservation(newReservation){
	
	return new Promise( (resolve, reject) => {
		const {DateReserveStart, DateReserveEnd, Name, RoomId} = newReservation 
		
		let connection = getConnection()
		
		let queryTemp = `INSERT INTO reservation (DateReserve, StartHour, EndHour, Name, RoomId)
		VALUES (STR_TO_DATE("${DateReserveStart}",'%d-%m-%Y'),
		STR_TO_DATE("${DateReserveEnd}",'%H:%i:%s'),
		"${Name}",
		"${RoomId}")`
		
		console.log(queryTemp)
		connection.query(queryTemp, function(err, res){
			
			connection.end()	
							 		 	
			if(err)
				return reject(err)
			
			return resolve(res)
		})
		
	})
	
	
}

function editReservation(editedReservation){
	
	return new Promise( (resolve, reject) => {
		const {Id, DateReserve, StartHour, EndHour, Name, RoomId} = editedReservation 
		
		let connection = getConnection()
		
		let queryTemp = `UPDATE reservation SET 
		DateReserve = STR_TO_DATE("${DateReserve}","%d-%m-%Y"), StartHour=STR_TO_DATE("${StartHour}","%H:%i:%s"), EndHour=STR_TO_DATE("${EndHour}","%H:%i:%s"), Name="${Name}", RoomId=${RoomId} WHERE Id=${Id}`
		
		console.log(queryTemp)
		connection.query(queryTemp, function(err, res){
			connection.end()
			
			if(err)
				return reject(err)
			
			return resolve(res)
		})
		
	})
	
	
}

function deleteReservation(reservationId){
	
	return new Promise( (resolve, reject) => {
		
		let connection = getConnection()
		
		connection.query(`DELETE FROM reservation WHERE Id = ${reservationId}`, function(err, res){
			connection.end()
			
			if(err)
				return reject(err)
			
			return resolve(res)
		})
	})   
}

function getReservation(reservationId) {
	
	return new Promise( (resolve, reject) => {
		
		let connection = getConnection()
		
		let queryTemp = `select * from reservation WHERE Id = ${reservationId}`
		console.log(queryTemp)
		connection.query(queryTemp, function(err, res){
			connection.end()
			if(err)
				return reject(err)
			
			return resolve(res)
		})
	})
}

module.exports = {
	getDayReservationList,	
	getRoomList,
	addReservation,
	editReservation,
	deleteReservation,
	getReservation
}