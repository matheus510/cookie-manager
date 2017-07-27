let app = require('./config/express.js')();
let reservationServices = require('./app/services/reservations-services.js');
let bodyParser = require('body-parser');

function logMe(req, res, next) {
    console.log("touched");

    next();
}
app.use(bodyParser());

app.get('/reservations', function(req, res) {
    reservationServices.getList().then(results => {
        console.log(results);
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});

app.get('/room', function(req, res) {
    reservationServices.getRoomList().then(results => {
        console.log(results);
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});

app.get('/room/:id', function(req, res) {
    reservationServices.getRoomReservationList(req.params.id).then(results => {
        console.log(results);
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});

app.get('/reservations/:id', function(req, res) {
    reservationServices.getReservation(req.params.id).then(results => {
        console.log(results);
        res.send(results);
    }, error => {
        res.status(400).send();
    })
});


app.post('/reservations', function(req, res) {
    console.log(req.body);

    reservationServices.addReservation(req.body).then(results => {
        console.log(2);
        res.send(null)
    }, error => {
        console.log(error)
        res.status(400).send();
    })
});

app.put('/reservations', function(req, res) {
    reservationServices.editReservation(req.body).then(results => {
        res.send(null);
    }, error => {
        console.log(error)
        res.status(400).send();
    })
});
app.delete('/reservations/:id', function(req, res) {
    reservationServices.deleteReservation(req.params.id).then(results => {
        res.send(results);
    }, error => {
        console.log(error)
        res.status(400).send();
    })
});



// xpara testar se ta chgando as info: app.use('/reservations', reservationServices);

app.listen(3000, function() {
    console.log("servidor rodando");
})