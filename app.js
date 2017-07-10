let app = require('./config/express.js')();
let rotaReservations = require('./app/routes/reservations');
let reservationServices = require('./app/services/reservations-services.js');
let bodyParser = require('body-parser');

function logMe(req,res,next){
	console.log("touched");

	next();
}
app.use(bodyParser());

app.get('/reservations', function(req, res) {
	reservationServices.getList().then( results => {
		console.log(results);
		res.send(results);
	}, error => {
		res.status(400).send();
	})
});

app.get('/reservations/:id', function(req, res) {
	reservationServices.getReservation(req.params.id).then( results => {
		console.log(results);
		res.send(results);
	}, error => {
		res.status(400).send();
	})
});


app.post('/reservations', function(req, res) {
	reservationServices.addReservation().then( results => {
		res.send(results);
	}, error => {
		console.log(results)
		res.status(400).send();
	})
});

app.put('/reservations', function(req, res) {
	reservationsServices.editReservation(/* Reserva */).then( results => {
		res.send(results);
	}, error => {
		console.log(results)
		res.status(400).send();
	}) 
})
app.delete('/reservations', function(req, res) {
	reservationsServices.deleteReservation(/* id da Reserva */).then( results => {
		res.send(results);
	}, error => {
		console.log(results)
		res.status(400).send();
	}) 
})



// xpara testar se ta chgando as info: app.use('/reservations', rotaReservations);

app.listen(3000, function() {
    console.log("servidor rodando");
})
