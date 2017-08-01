let app = require('./config/express.js')();
let reservationServices = require('./app/services/reservations-services.js');
let bodyParser = require('body-parser');

function logMe(req, res, next) {
    console.log("touched");

    next();
}
//app.use('Access-Control-Allow-Origin','*');
app.use(bodyParser());


app.get('/reservation', function(req, res) {
    reservationServices.getList().then(results => {
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});

app.get('/room', function(req, res) {
    reservationServices.getRoomList().then(results => {
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results)
        
    }, error => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.status(400).send();
    })
});

app.get('/room/:id', function(req, res) {
    reservationServices.getRoomReservationList(req.params.id).then(results => {
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});

app.get('/reservation/:id', function(req, res) {
    reservationServices.getReservation(req.params.id).then(results => {
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});


app.post('/reservation', function(req, res) {
    console.log(req.body);

    reservationServices.addReservation(req.body).then(results => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(null)
    }, error => {
        console.log(error)
        res.status(400).send();
    })
});

app.put('/reservation', function(req, res) {
    reservationServices.editReservation(req.body).then(results => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(null);
    }, error => {
        console.log(error)
        res.status(400).send();
    })
});
app.delete('/reservation/:id', function(req, res) {
    reservationServices.deleteReservation(req.params.id).then(results => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
    }, error => {
        console.log(error)
        res.status(400).send();
    })
});

app.listen(3000, function() {
    console.log("servidor rodando");
})