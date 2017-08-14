let app = require('./config/express.js')()
let reservationServices = require('./app/services/reservations-services.js')
let bodyParser = require('body-parser')

function logMe(req, res, next) {
    console.log("touched")

    next()
}
<<<<<<< HEAD
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
=======
app.use(bodyParser())

app.get('/room', function(req, res) {
    reservationServices.getRoomList().then(results => {
        console.log(results)
        res.send(results)
    }, error => {
        res.status(400).send()
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
    })
})

<<<<<<< HEAD
app.get('/room/:id', function(req, res) {
    reservationServices.getRoomReservationList(req.params.id).then(results => {
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
=======
app.get('/:day', function(req, res) {
    reservationServices.getDayReservationList(req.params.id).then(results => {
        console.log(results)
        res.send(results)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
    }, error => {
        res.status(400).send()
    })
})

app.get('/reservation/:id', function(req, res) {
    reservationServices.getReservation(req.params.id).then(results => {
<<<<<<< HEAD
        console.log(results);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
=======
        console.log(results)
        res.send(results)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
    }, error => {
        res.status(400).send()
    })
})


app.post('/reservation', function(req, res) {
    console.log(req.body)

    reservationServices.addReservation(req.body).then(results => {
<<<<<<< HEAD
        res.setHeader("Access-Control-Allow-Origin", "*")
=======
        console.log(2)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
        res.send(null)
    }, error => {
        console.log(error)
        res.status(400).send()
    })
})

app.put('/reservation', function(req, res) {
    reservationServices.editReservation(req.body).then(results => {
<<<<<<< HEAD
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(null);
=======
        res.send(null)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
    }, error => {
        console.log(error)
        res.status(400).send()
    })
})
app.delete('/reservation/:id', function(req, res) {
    reservationServices.deleteReservation(req.params.id).then(results => {
<<<<<<< HEAD
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(results);
=======
        res.send(results)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
    }, error => {
        console.log(error)
        res.status(400).send()
    })
})

app.listen(3000, function() {
    console.log("servidor rodando")
})